import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box, Button, Container, Divider, Link, Stack, Tooltip, Typography } from "@mui/material";
import { IPublication } from "../types/publication";
import { IAuthor } from "../types/author";
import React from "react";

function PublicationPage() {
	const { key } = useParams<{ key: string }>();
	const [publication, setPublication] = useState<IPublication | null>(null);
	const [authors, setAuthors] = useState<Record<string, IAuthor>>({});
	const [loaded, setLoaded] = useState(false);

	const renderAuthor = (id: string, idx: number, author: IAuthor) => {
		const fullName = `${author.firstName} ${author.lastName}`;
		const orcidLink = author.links?.find((l) => l.type === "orcid")?.url;
		const isMe = id === "svanbrabant";

		return (
			<React.Fragment key={id}>
				<Box
					component="span"
					fontWeight={isMe ? "bold" : "normal"}
				>
					<Link
						component={RouterLink}
						to={`/author/${id}`}
						color="inherit"
						underline="none"
						sx={{
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						}}
					>
						{fullName}
					</Link>
				</Box>
				{orcidLink && (
					<Tooltip title="View ORCID profile">
						<Link
							href={orcidLink}
							target="_blank"
							rel="noopener"
							sx={{
								ml: 0.5,
								display: "inline-flex",
								alignItems: "center",
							}}
						>
							<img
								src="https://info.orcid.org/wp-content/uploads/2019/11/orcid_16x16.png"
								alt="ORCID iD"
								width={10}
								height={10}
								style={{ verticalAlign: "middle" }}
							/>
						</Link>
					</Tooltip>
				)}
			</React.Fragment>
		);
	};

	useEffect(() => {
		let active = true;
		Promise.all([
			fetch("/data/publications.json").then((response) => response.json() as Promise<IPublication[]>),
			fetch("/data/authors.json").then((response) => response.json() as Promise<Record<string, IAuthor>>),
		]).then(([publications, authorData]) => {
			if (!active) return;
			setPublication(publications.find((item) => item.key === key) ?? null);
			setAuthors(authorData);
			setLoaded(true);
		});
		return () => { active = false; };
	}, [key]);

	useEffect(() => {
		if (!publication) return;
		document.title = `${publication.title} | Sebe Vanbrabant`;
		const description = publication.abstract || `${publication.title}, published in ${publication.venue.name}.`;
		let tag = document.querySelector('meta[name="description"]');
		if (!tag) {
			tag = document.createElement("meta");
			tag.setAttribute("name", "description");
			document.head.appendChild(tag);
		}
		tag.setAttribute("content", description);
		return () => { document.title = "Sebe Vanbrabant"; };
	}, [publication]);

	if (!loaded) return <Container maxWidth="md" sx={{ py: 4 }}><Typography>Loading publication…</Typography></Container>;
	if (!publication) return <Container maxWidth="md" sx={{ py: 4 }}><Typography variant="h5">Publication not found</Typography><Link component={RouterLink} to="/">Back to home</Link></Container>;

	const venueDisplayName = publication.venue.type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Stack spacing={3}>
				<Link component={RouterLink} to="/" underline="hover">← All publications</Link>
				<Box>
					<Typography variant="h4" component="h1" fontWeight={700} gutterBottom>{publication.title}</Typography>
					<Typography color="text.secondary">
						{publication.authors.map((id, idx) => {
							const author = authors[id];

							return (
								<React.Fragment key={id}>
									{author ? renderAuthor(id, idx, author) : id}
									{idx < publication.authors.length - 1 ? " · " : ""}
								</React.Fragment>
							);
						})}
					</Typography>
				</Box>

				<Divider />

				<Box>
					<Typography color="text.secondary">
						{"📄 "}
						{publication.venue.name}
						{publication.venue.publisher && (
							<>
								{", "}
								<i>
									{publication.venue.publisher}
								</i>
							</>
						)}
						{" "}
						(
						<Tooltip title={"Page of call leading to this " + publication.venue.short + " " + venueDisplayName}>
							<Link
								href={publication.venue.url}
								target="_blank"
								rel="noopener"
								underline="none"
								sx={{
									'&:hover': {
										textDecoration: 'underline',
									},
								}}
							>
								{venueDisplayName}
							</Link>
						</Tooltip>
						)
					</Typography>
					<Typography color="text.secondary">
						📍 {publication.venue.short} - {publication.venue.parent}
					</Typography>
				</Box>
				{publication.links?.length > 0 && <Stack direction="row" spacing={1} flexWrap="wrap">
					{publication.links.map((item) => <Button key={`${item.type}-${item.url}`} component="a" href={item.url} target="_blank" rel="noopener noreferrer" variant="outlined" size="small">{item.type.toUpperCase()}</Button>)}
				</Stack>}

				{publication.abstract && <>
					<Divider />
					<Box>
						<Typography variant="h6" component="h2" gutterBottom>Abstract</Typography>
						<Typography color="text.secondary" sx={{ whiteSpace: "pre-line" }}>{publication.abstract}</Typography>
					</Box>
				</>}
			</Stack>
		</Container>
	);
}

export default PublicationPage;

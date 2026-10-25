import { Box, Button, Container, Divider, Link, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Publication } from "../components/Publication";
import { socialLinkTooltips } from "../constants/socialLinkTooltips";
import { IAuthor } from "../types/author";
import { IPublication } from "../types/publication";

function AuthorPage() {
	const { id } = useParams<{ id: string }>();
	const [author, setAuthor] = useState<IAuthor | null>(null);
	const [authors, setAuthors] = useState<Record<string, IAuthor>>({});
	const [publications, setPublications] = useState<IPublication[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (!id) return;
		if (id === "svanbrabant") {
			navigate("/");
			return;
		}

		fetch("/data/authors.json")
			.then(res => res.json())
			.then(data => {
				if (data[id]) setAuthor(data[id]);
				setAuthors(data);
			});

		fetch("/data/publications.json")
			.then(res => res.json())
			.then((data: IPublication[]) => {
				setPublications(data.filter(x => x.authors.includes(id)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
			});
	}, [id, navigate]);

	useEffect(() => {
		if (!id) return;
		document.title = author ? `${author.firstName} ${author.lastName}` : "Author not found";
	}, [id, author]);

	if (!id) return <Typography>Invalid author id.</Typography>
	if (!author) return <Typography>Author not found.</Typography>;

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Stack spacing={4}>
				<Link component={RouterLink} to="/" underline="hover">← All publications</Link>
				<Box>
					<Stack spacing={2}>
						<Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
							{author.prefix} {author.firstName} {author.lastName.toLocaleUpperCase()}
						</Typography>
						<Stack direction={"row"} spacing={2}>
							{author.links?.map((link, idx) => {
								return (
									<Tooltip key={idx} title={socialLinkTooltips[link.type] ?? link.type}>
										<Link href={link.url} target="_blank" rel="noopener">
											<Button
												variant="outlined"
												size="small"
											>
												{socialLinkTooltips[link.type] ?? link.type.toUpperCase()}
											</Button>
										</Link>
									</Tooltip>
								);
							})}
						</Stack>
					</Stack>
				</Box>

				<Divider />

				<Stack spacing={2}>
					<Typography variant="h5">{author.firstName} {author.lastName}'s Publications with Sebe Vanbrabant</Typography>
					{publications.map((x, i) => {
						return (
							<Publication pub={x} authors={authors}></Publication>
						)
					})}
				</Stack>
			</Stack>
		</Container>
	);
}

export default AuthorPage;

import React from "react";
import { IAuthor } from "../types/author";
import { IPublication } from "../types/publication"
import {
	Card,
	CardContent,
	Typography,
	Link,
	Stack,
	Tooltip,
	Box,
	Button
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"

type Props = {
	pub: IPublication;
	authors: Record<string, IAuthor>;
};

export function Publication({ pub, authors }: Props) {
	const renderAuthor = (id: string, idx: number, author: IAuthor) => {
		const fullName = `${author.firstName} ${author.lastName}`;
		const orcidLink = author.links?.find((l) => l.type === "orcid")?.url;
		const isMe = id === "svanbrabant";

		return (
			<React.Fragment key={id}>
				<Box component="span" fontWeight={isMe ? "bold" : "normal"}>
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

	return (
		<Card variant="outlined">
			<CardContent>
				<Stack direction="row" justifyContent="space-between" spacing={2}>
					<Box>
						<Typography variant="subtitle1" fontWeight={600}>
							{pub.title}
						</Typography>
						
						<Typography variant="body2" color="text.secondary">
							{pub.authors.map((id, idx) => {
								const author = authors[id];

								return (
									<React.Fragment key={id}>
										{author ? renderAuthor(id, idx, author) : id}
										{idx < pub.authors.length - 1 ? ", " : ""}
									</React.Fragment>
								);
							})}
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{pub.venue.name}
							{pub.venue.publisher && (
								<>
									{", "}
									<i>
										{pub.venue.publisher}
									</i>
								</>
							)}
							{" "}
							(
								<Tooltip title={pub.venue.parent}>
									<Link
										href={pub.venue.url}
										target="_blank"
										rel="noopener"
										underline="none"
										sx={{
											'&:hover': {
												textDecoration: 'underline',
											},
										}}
									>
										{pub.venue.short} - {pub.venue.type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
									</Link>
								</Tooltip>
							)
						</Typography>

						<Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
							{pub.links?.map((link, i) => (
								<Link
									key={i}
									href={link.url}
									target="_blank"
									rel="noopener"
									variant="body2"
									underline="hover"
									sx={{ mr: 2 }}
								>
									<Button
										variant="outlined"
										size="small"
									>
										{link.type.toUpperCase()}
									</Button>
								</Link>
							))}
						</Stack>
					</Box>
					<Box
						minWidth={50}
						textAlign="right"
						color="text.secondary"
						fontWeight="medium"
						fontSize="1rem"
					>
						{new Date(pub.date).getFullYear()}
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}

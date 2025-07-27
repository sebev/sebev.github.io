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
					{fullName}
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
				{idx < pub.authors.length - 1 ? ", " : ""}
			</React.Fragment>
		);
	};

	return (
		<Card variant="outlined" sx={{ mb: 2 }}>
			<CardContent>
				<Typography variant="subtitle1" fontWeight={600}>
					{pub.title}
				</Typography>
				
				<Typography variant="body2" color="text.secondary">
					{pub.authors.map((id, idx) => {
						const author = authors[id];
						if (!author) return id;
						return renderAuthor(id, idx, author);
					})}
				</Typography>

				<Typography variant="body2" color="text.secondary">
					{pub.venue.name} (
						<Link
							href={pub.venue.url}
							target="_blank"
							rel="noopener"
						>
							{pub.venue.short}
						</Link>
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
			</CardContent>
		</Card>
	);
}

import React from "react";
import { IAuthor } from "../types/author";
import { IPublication } from "../types/publication"
import {
	Card,
	CardContent,
	Typography,
	Link,
	Stack,
	Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"

type Props = {
	pub: IPublication;
	authors: Record<string, IAuthor>;
};

export function Publication({ pub, authors }: Props) {
	const renderAuthor = (id: string, idx: number, author: IAuthor) => {
		const fullName = `${author.firstName} ${author.lastName}`;
		const isMe = id === "svanbrabant";

		return (
			<React.Fragment key={id}>
				<Box
					component="span"
					fontWeight={isMe ? "bold" : "normal"}
					color={isMe ? "#00a6f4" : "inherit"}
				>
					{fullName}
				</Box>
			</React.Fragment>
		);
	};

	return (
		<Card variant="outlined">
			<CardContent>
				<Stack direction="row" justifyContent="space-between" spacing={2}>
					<Box>
						<Typography variant="subtitle1" fontWeight={600}>
							<Link component={RouterLink} to={`/publication/${pub.key}`} color="inherit" underline="hover">
								{pub.title}
							</Link>
						</Typography>
						
						<Typography variant="body2" color="text.secondary">
							{pub.authors.map((id, idx) => {
								const author = authors[id];

								return (
									<React.Fragment key={id}>
										{author ? renderAuthor(id, idx, author) : id}
										{idx < pub.authors.length - 1 ? " · " : ""}
									</React.Fragment>
								);
							})}
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{pub.venue.short} · {pub.venue.name}
						</Typography>
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

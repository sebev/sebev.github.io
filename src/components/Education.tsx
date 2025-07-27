import React from "react";
import { IAuthor } from "../types/author";
import { IEducation } from "../types/education"
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
	edu: IEducation;
	authors: Record<string, IAuthor>;
};

export function Education({ edu, authors }: Props) {
	return (
		<Card variant="outlined">
			<CardContent>
				<Stack direction="row" justifyContent="space-between" spacing={2}>
					<Box>
						<Typography variant="subtitle1" fontWeight={600}>
							{edu.title}
						</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {edu.institution} - {edu.faculty}
                        </Typography>
					</Box>
					<Box
						minWidth={50}
						textAlign="right"
						color="text.secondary"
						fontWeight="medium"
						fontSize="1rem"
					>
						{new Date(edu.start).getFullYear()} - {new Date(edu.end).getFullYear()}
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}

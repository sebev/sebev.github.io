import { IAuthor } from "../types/author";
import { IEducation } from "../types/education"
import {
	Card,
	CardContent,
	Typography,
	Stack,
	Box} from "@mui/material";
import { CardDateRange } from "./CardDateRange";

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
					<CardDateRange startYear={new Date(edu.start).getFullYear()} endYear={new Date(edu.end).getFullYear()} />
				</Stack>
			</CardContent>
		</Card>
	);
}

import { Box } from "@mui/material";

type Props = {
	startYear: number;
	endYear: number;
};

export function CardDateRange({ startYear, endYear }: Props) {
	return (
		<Box
			minWidth={100}
			textAlign="right"
			color="text.secondary"
			fontWeight="medium"
			fontSize="1rem"
		>
			{startYear === endYear ? startYear : startYear + " - " + endYear}
		</Box>
	);
}

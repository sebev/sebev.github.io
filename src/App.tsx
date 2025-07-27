import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress, Button, Stack } from "@mui/material";
import { Publication } from "./components/Publication";
import { IAuthor } from "./types/author";
import { IPublication } from "./types/publication"

function App() {
	const [publications, setPublications] = useState<IPublication[]>([]);
	const [authors, setAuthors] = useState<Record<string, IAuthor>>({});
	const [loading, setLoading] = useState(true);
	const [sortDescending, setSortDescending] = useState(true);

	const sortedPubs = [...publications].sort((a, b) =>
		sortDescending
			? new Date(b.date).getTime() - new Date(a.date).getTime()
			: new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	useEffect(() => {
		async function loadData() {
			const [pubRes, authRes] = await Promise.all([
				fetch("/data/publications.json"),
				fetch("/data/authors.json")
			]);
			const pubs = await pubRes.json();
			const auths = await authRes.json();
			setPublications(pubs);
			setAuthors(auths);
			setLoading(false);
		}
		loadData();
	}, []);

	if (loading) {
		return (
			<Container maxWidth="md" sx={{ py: 4 }}>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Typography variant="h4" fontWeight={700} gutterBottom>
				Sebe Vanbrabant
			</Typography>
			<Typography variant="subtitle1" color="text.secondary" gutterBottom>
				PhD Candidate at Hasselt University, Digital Future Lab
			</Typography>

			<Box mt={4}>
				<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h5">Publications</Typography>
					<Button
						variant="outlined"
						size="small"
						onClick={() => setSortDescending((prev) => !prev)}
					>
						{sortDescending ? "Newest First" : "Oldest First"}
					</Button>
				</Stack>

				{sortedPubs.map((pub) => (
					<Publication key={pub.title} pub={pub} authors={authors} />
				))}
			</Box>
		</Container>
	);
}

export default App;

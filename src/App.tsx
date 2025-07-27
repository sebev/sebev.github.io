import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { Publication } from "./components/Publication";
import { IAuthor } from "./types/author";
import { IPublication } from "./types/publication"

function App() {
	const [publications, setPublications] = useState<IPublication[]>([]);
	const [authors, setAuthors] = useState<Record<string, IAuthor>>({});
	const [loading, setLoading] = useState(true);

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
				<Typography variant="h5" gutterBottom>
					Publications
				</Typography>
				{publications.map((pub, idx) => (
					<Publication key={pub.title} pub={pub} authors={authors} />
				))}
			</Box>
		</Container>
	);
}

export default App;

import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress, Button, Stack, Divider } from "@mui/material";
import { Publication } from "./components/Publication";
import { Education } from "./components/Education"
import { IAuthor } from "./types/author";
import { IPublication } from "./types/publication"
import { IEducation } from "./types/education"

function App() {
	const [publications, setPublications] = useState<IPublication[]>([]);
	const [education, setEducation] = useState<IEducation[]>([]);
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
			const [pubRes, eduRes, authRes] = await Promise.all([
				fetch("/data/publications.json"),
				fetch("/data/education.json"),
				fetch("/data/authors.json"),
			]);
			const pubs = await pubRes.json();
			const edus = await eduRes.json();
			edus.sort((a: IEducation, b: IEducation) => {
				return new Date(b.start).getTime() - new Date(a.start).getTime();
			})
			const auths = await authRes.json();
			setPublications(pubs);
			setEducation(edus);
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
			<Stack direction={"column"} spacing={4}>
				<Box>
					<Typography variant="h4" fontWeight={700} gutterBottom>
						Sebe Vanbrabant
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" gutterBottom>
						PhD Candidate at Hasselt University, Digital Future Lab
					</Typography>
				</Box>

				<Divider />

				<Stack direction={"column"} spacing={2}>
					<Typography variant="h5">Education</Typography>

					{education.map((edu) => (
						<Education key={edu.title} edu={edu} authors={authors} />
					))}
				</Stack>

				<Divider />

				<Stack direction={"column"} spacing={2}>
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
				</Stack>
			</Stack>
		</Container>
	);
}

export default App;

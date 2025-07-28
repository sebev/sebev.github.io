import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAuthor } from "../types/author";
import { Typography, Link, Stack, Container, Button, Divider, Box } from "@mui/material";
import { IPublication } from "../types/publication";
import { Publication } from "../components/Publication";
import { useNavigate } from "react-router-dom";

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

	if (!id) return <Typography>Invalid author id.</Typography>
	if (!author) return <Typography>Author not found.</Typography>;

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Stack spacing={4}>
				<Box>
					<Stack spacing={2}>
						<Typography variant="h4">
							{author.prefix} {author.firstName} {author.lastName.toLocaleUpperCase()}
						</Typography>
						<Stack direction={"row"} spacing={2}>
							{author.links?.map((link, idx) => {
								return (
									<Link key={idx} href={link.url} target="_blank" rel="noopener">
										<Button
											variant="outlined"
											size="small"
										>
											{link.type.toUpperCase()}
										</Button>
									</Link>
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

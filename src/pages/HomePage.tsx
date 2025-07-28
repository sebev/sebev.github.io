import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, Typography, Box, CircularProgress, Button, Stack, Divider, Avatar, Link } from "@mui/material";
import { Publication } from "../components/Publication";
import { Education } from "../components/Education"
import { IAuthor } from "../types/author";
import { IPublication } from "../types/publication"
import { IEducation } from "../types/education"

const iconMap: Record<string, string> = {
    uhasselt: "https://www.uhasselt.be/media/ipqjpjbk/favicon_uhasselt.jpg?width=32&height=32",
    orcid: "https://orcid.org/assets/icons/favicon.ico",
    github: "https://github.githubassets.com/favicons/favicon.png",
    scholar: "https://scholar.google.com/favicon.ico",
    researchgate: "https://c5.rgstatic.net/m/42199702882742/images/favicon/favicon-32x32.png",
};

function HomePage() {
    const [publications, setPublications] = useState<IPublication[]>([]);
    const [education, setEducation] = useState<IEducation[]>([]);
    const [authors, setAuthors] = useState<Record<string, IAuthor>>({});
    const [loading, setLoading] = useState(true);
    const [sortDescending, setSortDescending] = useState(true);

    const boxRef = useRef<HTMLDivElement>(null);
    const [avatarSize, setAvatarSize] = useState<number>(0);

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

    useLayoutEffect(() => {
        if (boxRef.current) {
            const height = boxRef.current.offsetHeight;
            setAvatarSize(height);
        }
    }, [loading]);

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
                <Stack direction={"row"} spacing={2}>
                    <Stack direction={"column"} spacing={2}>
                        <Stack direction={"row"} spacing={2} alignItems={"stretch"}>
                            <Avatar
                                sx={{
                                    width: avatarSize,
                                    height: avatarSize,
                                    alignSelf: 'stretch',
                                    fontSize: 20,
                                }}
                            >
                                SV
                            </Avatar>
                            <Box ref={boxRef}>
                                <Typography variant="h4" fontWeight={700} gutterBottom>
                                    Sebe Vanbrabant
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    PhD Candidate at <Link
                                        href={"https://www.uhasselt.be/en"}
                                        target="_blank"
                                        rel="noopener"
                                    >Hasselt University</Link>, <Link
                                        href={"https://www.uhasselt.be/en/instituten-en/digitalfuturelab"}
                                        target="_blank"
                                        rel="noopener"
                                    >Digital Future Lab</Link>
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Member of the <Link
                                        href={"https://www.uhasselt.be/en/instituten-en/expertise-centre-for-digital-media/research/intelligible-interactive-systems"}
                                        target="_blank"
                                        rel="noopener"
                                    >Intelligible Interactive Systems</Link> Research Unit and <Link
                                        href={"https://www.flandersmake.be/en"}
                                        target="_blank"
                                        rel="noopener"
                                    >Flanders Make</Link>
                                </Typography>
                            </Box>
                        </Stack>
                        <Typography variant="body1" color="text.primary">
                            My research interests are at the intersection of human-computer interaction and (generative) AI.
                            More specifically, I focus on explainable AI (XAI), and using generative AI and intelligible user interfaces to improve AI understanding towards different users.
                            My current research investigates the role and benefits of Large Language Models and Variational Autoencoders in XAI.
                        </Typography>
                    </Stack>
                    <Stack direction={"column"} spacing={1}>
                        {authors["svanbrabant"].links.map((x, i) => {
                            const iconUrl = iconMap[x.type];
                            if (!iconUrl) return null;
                            return (
                                <Link
                                    key={i}
                                    href={x.url}
                                    target="_blank"
                                    rel="noopener"
                                    sx={{ display: "inline-flex", alignItems: "center" }}
                                >
                                    <Avatar
                                    src={iconUrl}
                                    alt={x.type}
                                    sx={{ width: 24, height: 24 }}
                                    />
                                </Link>
                            );
                        })}
                    </Stack>
                </Stack>

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

export default HomePage;

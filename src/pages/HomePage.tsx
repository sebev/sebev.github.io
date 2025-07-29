import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, Typography, Box, CircularProgress, Button, Stack, Divider, Avatar, Link, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import { Publication } from "../components/Publication";
import { Education } from "../components/Education"
import { IAuthor } from "../types/author";
import { IPublication } from "../types/publication"
import { IEducation } from "../types/education"
import { IThesis } from "../types/thesis";
import { ICourse } from "../types/course";
import { CardDateRange } from "../components/CardDateRange";

const iconMap: Record<string, string> = {
    uhasselt: "https://www.uhasselt.be/media/ipqjpjbk/favicon_uhasselt.jpg?width=32&height=32",
    orcid: "https://orcid.org/assets/icons/favicon.ico",
    github: "https://github.githubassets.com/favicons/favicon.png",
    scholar: "https://scholar.google.com/favicon.ico",
    researchgate: "https://c5.rgstatic.net/m/42199702882742/images/favicon/favicon-32x32.png",
    linkedin: "https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca",
};

const tooltipMap: Record<string, string> = {
    uhasselt: "Hasselt Univserity",
    orcid: "ORCID",
    github: "GitHub",
    scholar: "Google Scholar",
    researchgate: "ResearchGate",
    linkedin: "LinkedIn",
}

function HomePage() {
    const [publications, setPublications] = useState<IPublication[]>([]);
    const [education, setEducation] = useState<IEducation[]>([]);
    const [authors, setAuthors] = useState<Record<string, IAuthor>>({});
    const [theses, setTheses] = useState<IThesis[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([]);
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
            const [pubRes, eduRes, authRes, thesesRes, coursesRes] = await Promise.all([
                fetch("/data/publications.json"),
                fetch("/data/education.json"),
                fetch("/data/authors.json"),
                fetch("/data/theses.json"),
                fetch("/data/courses.json")
            ]);
            const pubs = await pubRes.json();
            const edus = await eduRes.json();
            edus.sort((a: IEducation, b: IEducation) => {
                return new Date(b.start).getTime() - new Date(a.start).getTime();
            })
            const auths = await authRes.json();
            const theses = await thesesRes.json();
            const courses = await coursesRes.json();
            setPublications(pubs);
            setEducation(edus);
            setAuthors(auths);
            setTheses(theses.reverse());
            setCourses(courses);
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
                <Stack direction={"row"} spacing={4}>
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
                                        underline="none"
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >Hasselt University</Link>, <Link
                                        href={"https://www.uhasselt.be/en/instituten-en/digitalfuturelab"}
                                        target="_blank"
                                        rel="noopener"
                                        underline="none"
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >Digital Future Lab</Link>
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Member of the <Link
                                        href={"https://www.uhasselt.be/en/instituten-en/expertise-centre-for-digital-media/research/intelligible-interactive-systems"}
                                        target="_blank"
                                        rel="noopener"
                                        underline="none"
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >Intelligible Interactive Systems</Link> Research Unit and <Link
                                        href={"https://www.flandersmake.be/en"}
                                        target="_blank"
                                        rel="noopener"
                                        underline="none"
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >Flanders Make</Link>
                                </Typography>
                            </Box>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" align="justify">
                            My research interests are at the intersection of human-computer interaction and (generative) AI, within the context of explainable AI (XAI).
                            I investigate how generative models and intelligible user interfaces can improve AI understanding for various users.
                            Currently, I am exploring the roles and benefits of both Large Language Models and Variational Autoencoders in facilitating interaction with other AI systems.
                        </Typography>
                        {/* <Typography variant="body1" color="text.secondary" align="justify">
                           
                        </Typography> */}
                    </Stack>
                    <Stack direction={"column"} spacing={0}>
                        {authors["svanbrabant"].links.map((x, i) => {
                            if (x.type === "uhasselt") return null;
                            const iconUrl = iconMap[x.type];
                            if (!iconUrl) return null;

                            return (
                                <Tooltip key={i} title={tooltipMap[x.type]} placement={"right"}>
                                    <IconButton
                                        component="a"
                                        href={x.url}
                                        target="_blank"
                                        rel="noopener"
                                        sx={{ display: "inline-flex", alignItems: "center" }}
                                    >
                                        <Avatar
                                            src={iconUrl}
                                            alt={x.type}
                                            sx={{ width: 22, height: 22 }}
                                        />
                                    </IconButton>
                                </Tooltip>
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

                <Divider />

                <Stack direction={"column"} spacing={2}>
                    <Typography variant="h5">Presentations</Typography>

                    {publications.filter((x) => x.presented).reverse().map((publication) => (
                        <Card variant="outlined">
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" spacing={2}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {publication.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {publication.venue.parent} ({publication.venue.short})
                                        </Typography>
                                    </Box>
                                    <Box
                                        minWidth={100}
                                        textAlign="right"
                                        color="text.secondary"
                                        fontWeight="medium"
                                        fontSize="1rem"
                                    >
                                        {new Date(publication.date).toLocaleDateString()}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                <Divider />

                <Stack direction={"column"} spacing={2}>
                    <Typography variant="h5">Thesis Supervision</Typography>

                    {theses.map((thesis) => (
                        <Card variant="outlined">
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" spacing={2}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {thesis.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {thesis.student}, {thesis.type}'s thesis
                                        </Typography>
                                    </Box>
                                    {/* Pass end year twice instead, inconsistent range is more confusing than helpful */}
                                    <CardDateRange startYear={new Date(thesis.end).getFullYear()} endYear={new Date(thesis.end).getFullYear()} />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                <Divider />

                <Stack direction={"column"} spacing={2}>
                    <Typography variant="h5">Courses</Typography>

                    {courses.map((course) => (
                        <Card variant="outlined">
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" spacing={2}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            <Link
                                                href={course.url}
                                                target="_blank"
                                                rel="noopener"
                                                underline="none"
                                                sx={{
                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                    },
                                                }}
                                            >
                                                {course.title}
                                            </Link>
                                        </Typography>
                                    </Box>
                                    <CardDateRange startYear={new Date(course.start).getFullYear()} endYear={new Date(course.end).getFullYear()} />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
}

export default HomePage;

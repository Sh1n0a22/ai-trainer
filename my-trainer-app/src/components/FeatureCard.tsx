import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

type cardProps = {
    title:string,
    description:string,
    content?: React.ReactNode
}
export default function FeatureCard({title,description,content}:cardProps) {
   return <Card>
    <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription className="h-24 w-full overflow-hidden text-ellipsis line-clamp-4 p-4">{description}</CardDescription>
  </CardHeader>
  <CardContent className="text-end">
    {content}
  </CardContent>
</Card>
}
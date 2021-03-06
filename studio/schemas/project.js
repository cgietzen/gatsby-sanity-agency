export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Some frontends will require a slug to be set to be able to show the post',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'blockContent'
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            description: 'You can use this field to schedule post where you show them',
            type: 'datetime'
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'mainImage'
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        }
    ],
    preview: {
        select: {
            title: 'title',
            publishedAt: 'publishedAt',
            image: 'mainImage'
        },
        prepare ({ title = 'No title', publishedAt, image }) {
            return {
                title,
                subtitle: publishedAt
                    ? new Date(publishedAt).toLocaleDateString()
                    : 'Missing publishing date',
                media: image
            }
        }
    }
}
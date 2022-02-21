# Contributing

## Prerequisites

-   `git`
    -   install git, if needed (<https://git-scm.com/>)
-   `ruby >=2.7, >=3.x`
    -   install or update ruby, if needed (<https://jekyllrb.com/docs/installation/>)
    - while ruby 3.x or greater _should_ work, I've only tested with ruby 2.7. 
    -   make sure to also install the jekyll and bundler gems

Open a terminal, and cd to an appropriate location. Then clone this repository, and cd into it.

```sh
git clone https://github.com/BDSI-Utwente/bdsi.utwente.nl.git
cd bdsi.utwente.nl
```

If you have correctly installed ruby and bundler, you can now tell bundler to download and install additional required gems. Note that you may have to restart your IDE/terminal or logout and login in order for newly installed applications (i.e. `bundler`, `jekyll`, etc.) to be found.

```sh
bundler install
```

Installing all dependencies may take a couple of minutes.

## Compiling and serving a local version of the website

After installing all dependencies, you can compile and view a local version of the website using the `jekyll serve` command.

```sh
jekyll serve
```

This compiles the website, and then starts a local server. Open a browser and navigate to the server address displayed (usually <http://127.0.0.1:4000>) to view the website. Any changes to the source files (more on that later) will be automatically compiled.

You can use the `--livereload` (or `-l`) flag to have jekyll add some clever code that automatically reloads the page in your browser whenever any changes are made. This is obviously very useful, but sometimes causes issues (particularly on windows).

```sh
jekyll serve -l
```

## Adding content

Adding a news item, blog post, project page or other piece of content is done through adding `markdown` files in the relevant folder. Team pages live in the `_team` folder, news items in `_news`, blog posts in `_blogs`, project pages in `_projects`, events in `_events/seminars` and `_events/workshops`, and so forth.

### Front Matter

For a markdown file to be compiled as a page on the website, it needs to have a 'front matter' section. An example news item might look as follows;

```yaml
---
title: R workshops for teaching staff
frontpage: true
image: /assets/images/r-logo.svg
imageNarrow: true
introduction: |
    A new set of R worskhops for BMS teaching staff provided by CoDE (formerly OMD) is now open for registration.
date: 2021-09-28
authors:
    - Stéphanie van den Berg
    - Martin Schmettow
layout: news
---
```

This front matter contains metadata about the page, in the `yaml` format. By and large, the purpose of the various tags should be clear. When in doubt, checking other pages in the same category may help. Events, for example, have extra fields for `startDate`, `endDate`, `time` and list of `tags`. Most pages will have at least a `title`, `description`, list of `authors` (or a single `author`), and `image` field.

Any authors that match _exactly_ match a team members' `title` field get special treatment, adding a profile picture and link to their name.

Header images for a page can be controlled with the `image` field. By default, the image will be stretched until it covers the entire top 'banner', but this can be controlled with the `imageNarrow` tag. If a transparent or narrow image is used, the background color of the banner can be overridden with the `imageBackground` field. Note that images can be resized and cropped to fit various screen sizes, so you should never rely on text in images to be visible.

### Content

Jekyll will compile any markdown, with appropriate extensions for `LaTeX` formatted mathematical equations (use `$` tags, e.g. `$y = x^2$`), fenced code blocks, and so forth.

You can also use inline `html` to take direct control, and add any html, css or javascript code you want. For example, many of the events pages use html to add a sign up button.

Finally, jekyll uses the `liquid` templating engine to render pages. You can use variables defined in data sources (such as the front matter), includes (see the `_includes` folder), and so forth. You are unlikely to have a need for these tools, but see the jekyll and liquid documentation for more details when you do.

## Submitting changes

To see your changes on <https://bdsi.utwente.nl>, you need to create a commit, and push your changes to GitHub.

```sh
git commit -am "add news article for xxxxx"
git push
```

This creates a new commit with all new changes (`-a`), and a message describing the changes (`-m "a short but descriptive message"`), and then push these changes to the repository. Make sure to use a short but descriptive message. You may need to create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) in order to authenticate.

Pushing your changes to GitHub will start a series of events, starting with a GitHub action that:

1. compiles your changes
2. pushes the updated website to the `www` branch
3. notifies the webserver a new version is available

The webserver then fetches these changes, and updates the website.

Normally, this process takes around a minute to complete, but it may sometimes take significantly longer. If all goes well, you should see your changes reflected shortly. You can view the progress of this 'Build & Deploy' action at <https://github.com/BDSI-Utwente/bdsi.utwente.nl/actions>.

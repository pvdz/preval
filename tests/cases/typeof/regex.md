# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Inlining `typeof` when we know something is a literal

Regular expressions are objects. They do not have a special type, only special syntax.

## Input

`````js filename=intro
$(typeof /1/);
`````

## Normalized

`````js filename=intro
$(typeof /1/);
`````

## Output

`````js filename=intro
$('object');
`````

# Preval test case

# regex_2.md

> Constants > Regex 2
>
> Copy one constant into another. Should fold them.

This one is debatable because a regex is an object so this isn't necessarily safe to inline.

There are some cases, like if we can statically detect that all usages of it are going to use it as intentional. But even then, there is some state in regex object which makes unbound inlining a bad idea.

## Input

`````js filename=intro
const foo = /foo/g;
const bar = foo;
$(bar);
`````

## Pre Normal


`````js filename=intro
const foo = /foo/g;
const bar = foo;
$(bar);
`````

## Normalized


`````js filename=intro
const foo = /foo/g;
const bar = foo;
$(bar);
`````

## Output


`````js filename=intro
const foo /*:regex*/ = /foo/g;
$(foo);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/g;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

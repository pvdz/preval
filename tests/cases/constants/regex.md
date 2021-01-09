# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

This one is debatable because a regex is an object so this isn't necessarily safe to inline.

There are some cases, like if we can statically detect that all usages of it are going to use it as intentional. But even then, there is some state in regex object which makes unbound inlining a bad idea.

The exception, of course, is single usage (like in this test). Since that moots the problem above.

## Input

`````js filename=intro
const foo = /foo/g;
const bar = foo;
$(bar)
`````

## Normalized

`````js filename=intro
const foo = /foo/g;
const bar = foo;
$(bar);
`````

## Uniformed

`````js filename=intro
var x = /regex/;
var x = x;
x(x);
`````

## Output

`````js filename=intro
$(/foo/g);
`````

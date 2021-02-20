# Preval test case

# regex_2.md

> Constants > Regex 2
>
> Copy one constant into another. Should fold them.

This one is debatable because a regex is an object so this isn't necessarily safe to inline.

There are some cases, like if we can statically detect that all usages of it are going to use it as intentional. But even then, there is some state in regex object which makes unbound inlining a bad idea.

#TODO

## Input

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
const foo = /foo/g;
$(foo);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

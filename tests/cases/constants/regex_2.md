# Preval test case

# copy.md

> constants > copy
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
$(bar);
`````

## Normalized

`````js filename=intro
const foo = /foo/g;
const bar = foo;
$(bar);
$(bar);
`````

## Output

`````js filename=intro
$(/foo/g);
$(/foo/g);
`````

## Result

Should call `$` with:
 - 0: {}
 - 1: {}
 - 2: undefined

Normalized calls: Same

Final output calls: Same

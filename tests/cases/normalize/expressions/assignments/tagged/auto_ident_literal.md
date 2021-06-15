# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Tagged > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = "foo")} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = `foo`));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = `foo`;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, `foo`);
$(`foo`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

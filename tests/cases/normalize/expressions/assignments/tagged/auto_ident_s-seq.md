# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Tagged > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = ($(1), $(2), x))} after`;
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$`before ${(a = ($(1), $(2), x))} after`;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
$(1);
$(2);
a = x;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
$(1);
$(2);
$(tmpCalleeParam, 1);
$(1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: ['before ', ' after'], 1
 - 4: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

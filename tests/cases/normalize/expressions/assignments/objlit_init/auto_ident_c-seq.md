# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = ($(1), $(2), $(x))) });
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$({ x: (a = ($(1), $(2), $(x))) });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
a = $(x);
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const SSA_a = $(1);
const tmpCalleeParam = { x: SSA_a };
$(tmpCalleeParam);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: { x: '1' }
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

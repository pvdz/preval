# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > assignments > tagged > auto_ident_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = ($(1), $(2), $(x)))} after`;
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
a = $(x);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
$(1);
$(2);
a = $(x);
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: ['before ', ' after'], 1
 - 5: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
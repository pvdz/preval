# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(60);
a.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 60 );
a.a;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

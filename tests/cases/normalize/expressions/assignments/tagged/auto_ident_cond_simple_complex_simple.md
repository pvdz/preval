# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident cond simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 1 ? $(2) : $($(100)))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = 1 ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = $(2);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ "before ", " after" ];
$( b, a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: ['before ', ' after'], 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

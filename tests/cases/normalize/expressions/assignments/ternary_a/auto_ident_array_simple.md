# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) ? $(100) : $(200));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) ? $(100) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
a = [1, 2, 3];
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam = $(100);
$(tmpClusterSSA_tmpCalleeParam);
const a = [1, 2, 3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = [ 1, 2, 3 ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

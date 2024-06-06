# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident cond simple c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(60);
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const a = $(60);
let x = undefined;
for (x in a) {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 60 );
let b = undefined;
for (b in a) {

}
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

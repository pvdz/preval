# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > For-a > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = ($(b), $(c)).x = c;false;) $(a, b, c);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3;
{
  let a$1 = (($(b), $(c)).x = c);
  while (false) {
    $(a$1, b, c);
  }
}
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
$(b);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a$1 = varInitAssignLhsComputedRhs;
`````

## Output


`````js filename=intro
$(2);
const varInitAssignLhsComputedObj = $(3);
varInitAssignLhsComputedObj.x = 3;
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
a.x = 3;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

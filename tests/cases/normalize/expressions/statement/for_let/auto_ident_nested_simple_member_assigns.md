# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > For let > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (let xyz = (b.x = b.x = b.x = b.x = b.x = b.x = c); ; $(1)) $(xyz);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  let xyz = (b.x = b.x = b.x = b.x = b.x = b.x = c);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedRhs$9 = c;
b.x = varInitAssignLhsComputedRhs$9;
const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$9;
b.x = varInitAssignLhsComputedRhs$7;
const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
b.x = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
let xyz = varInitAssignLhsComputedRhs;
while (true) {
  $(xyz);
  $(1);
}
$(a, b, c);
`````

## Output


`````js filename=intro
$(3);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(3);
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 3 );
  $( 1 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 3
 - 6: 1
 - 7: 3
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 3
 - 12: 1
 - 13: 3
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 3
 - 18: 1
 - 19: 3
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 3
 - 24: 1
 - 25: 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

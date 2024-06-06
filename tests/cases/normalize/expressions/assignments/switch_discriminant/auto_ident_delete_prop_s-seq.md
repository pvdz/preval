# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ((a = delete ($(1), $(2), arg).y)) {
  default:
    $(100);
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = delete ($(1), $(2), arg).y);
  if (true) {
    $(100);
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
let tmpSwitchDisc = a;
$(100);
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const a = delete arg.y;
$(100);
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = deletea.y;
$( 100 );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

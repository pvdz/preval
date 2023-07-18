# Preval test case

# ident_nested_complex_member_assigns2.md

> Normalize > Expressions > Statement > Param default > Ident nested complex member assigns2
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  a = y;
}

let a = 1;
const x = 3;
const y = x;

f();

$(100, a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  a = y;
};
let a = 1;
const x = 3;
const y = x;
f();
$(100, a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = y;
  return undefined;
};
let a = 1;
const x = 3;
const y = x;
f();
$(100, a);
`````

## Output

`````js filename=intro
$(100, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

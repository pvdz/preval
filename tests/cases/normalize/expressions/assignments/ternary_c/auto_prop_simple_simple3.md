# Preval test case

# auto_prop_simple_simple3.md

> Normalize > Expressions > Assignments > Ternary c > Auto prop simple simple3
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
} else {
  const one = $(1);
  const obj = { b: one };
  a = obj;
}
a.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
} else {
  const one = $(1);
  const obj = { b: one };
  a = obj;
}
a.b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
} else {
  const one = $(1);
  const obj = { b: one };
  a = obj;
}
a.b = 2;
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
} else {
  const one = $(1);
  const obj = { b: one };
  a = obj;
}
a.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 0 );
if (b) {

}
else {
  const c = $( 1 );
  const d = { b: c };
  a = d;
}
a.b = 2;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

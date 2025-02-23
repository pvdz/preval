# Preval test case

# ident_member_sequence_simple.md

> Normalize > Binding > Stmt-global-block > Ident member sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3;
  let a = (b.x, c).foo;
  $(a, b, c);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let b = { x: 2 },
    c = 3;
  let a = (b.x, c).foo;
  $(a, b, c);
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  b.x;
  const tmpCompObj = c;
  let a = tmpCompObj.foo;
  $(a, b, c);
} else {
}
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const a /*:unknown*/ = (3).foo;
  const b /*:object*/ = { x: 2 };
  $(a, b, 3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = 3.foo;
  const c = { x: 2 };
  $( b, c, 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: undefined, { x: '2' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

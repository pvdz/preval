# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = () => {}) || (a = () => {}));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = () => {
    debugger;
  }) ||
    (a = () => {
      debugger;
    }),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = function () {
    debugger;
    return undefined;
  };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs /*:()=>undefined*/ = function () {
    debugger;
    return undefined;
  };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  return undefined;
};
if (a) {
  $( a );
}
else {
  const b = function() {
    debugger;
    return undefined;
  };
  a = b;
  $( b );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

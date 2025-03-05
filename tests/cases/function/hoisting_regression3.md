# Preval test case

# hoisting_regression3.md

> Function > Hoisting regression3
>
> huh

## Input

`````js filename=intro
$(() => {
  if ($) {
    return;
  }
  let wheredoyougoto = $()
  function incorrectlyhoisted() {
    let C = $({});
    C["innerHTML"] = wheredoyougoto;
  }
  return incorrectlyhoisted
});
`````

## Pre Normal


`````js filename=intro
$(() => {
  debugger;
  let incorrectlyhoisted$3 = function () {
    debugger;
    let C = $({});
    C[`innerHTML`] = wheredoyougoto;
  };
  if ($) {
    return;
  }
  let wheredoyougoto = $();
  return incorrectlyhoisted$3;
});
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = function () {
  debugger;
  let incorrectlyhoisted$3 = function () {
    debugger;
    const tmpCalleeParam$1 = {};
    let C = $(tmpCalleeParam$1);
    C.innerHTML = wheredoyougoto;
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
  }
  let wheredoyougoto = $();
  return incorrectlyhoisted$3;
};
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:()=>unknown*/ = function () {
  debugger;
  const incorrectlyhoisted$3 /*:()=>undefined*/ = function () {
    debugger;
    const tmpCalleeParam$1 /*:object*/ = {};
    const C /*:unknown*/ = $(tmpCalleeParam$1);
    C.innerHTML = wheredoyougoto;
    return undefined;
  };
  if ($) {
    return undefined;
  } else {
  }
  const wheredoyougoto /*:unknown*/ = $();
  return incorrectlyhoisted$3;
};
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = function() {
    debugger;
    const c = {};
    const d = $( c );
    d.innerHTML = e;
    return undefined;
  };
  if ($) {
    return undefined;
  }
  const e = $();
  return b;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# simple_switch_block.md

> Switch > Simple switch block

Straightforward switches should have a better transform.

The generic transform makes for bad logic. We must suport it but we can have
a happier path for switches that don't fall-through and have a default in the
last position, or none at all. Not this dual if-else crap.

## Input

`````js filename=intro
function f() {
  switch (typeof $('x')) {
    case 'string': { return 1; }
    case 'number': { return 2; }
    case 'boolean': return 3;
    default: return 4;
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  tmpSwitchBreak: {
    const tmpSwitchDisc = typeof $(`x`);
    if (tmpSwitchDisc === `string`) {
      {
        return 1;
      }
    } else if (tmpSwitchDisc === `number`) {
      {
        return 2;
      }
    } else if (tmpSwitchDisc === `boolean`) {
      return 3;
    } else if (true) {
      return 4;
    } else {
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpUnaryArg = $(`x`);
  const tmpSwitchDisc = typeof tmpUnaryArg;
  const tmpIfTest = tmpSwitchDisc === `string`;
  if (tmpIfTest) {
    return 1;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === `number`;
    if (tmpIfTest$1) {
      return 2;
    } else {
      const tmpIfTest$3 = tmpSwitchDisc === `boolean`;
      if (tmpIfTest$3) {
        return 3;
      } else {
        return 4;
      }
    }
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam /*:number*/ = 1;
const tmpUnaryArg /*:unknown*/ = $(`x`);
const tmpSwitchDisc /*:string*/ = typeof tmpUnaryArg;
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === `string`;
if (tmpIfTest) {
} else {
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === `number`;
  if (tmpIfTest$1) {
    tmpCalleeParam = 2;
  } else {
    const tmpIfTest$3 /*:boolean*/ = tmpSwitchDisc === `boolean`;
    if (tmpIfTest$3) {
      tmpCalleeParam = 3;
    } else {
      tmpCalleeParam = 4;
    }
  }
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( "x" );
const c = typeof b;
const d = c === "string";
if (d) {

}
else {
  const e = c === "number";
  if (e) {
    a = 2;
  }
  else {
    const f = c === "boolean";
    if (f) {
      a = 3;
    }
    else {
      a = 4;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

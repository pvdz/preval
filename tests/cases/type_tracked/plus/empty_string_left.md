# Preval test case

# empty_string_left.md

> Type tracked > Plus > Empty string left
>
> When appending an empty string to a value known to be a string, the operation is essentially a noop and can be dropped.

#TODO

## Input

`````js filename=intro
function f() {
  const a = '' + $(1); // Unknown value but known to be a string
  $(a, 'a');
  const b = '' + a; // Redundant. This is what we want to drop.
  $(b, 'b');
}
f();
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = `` + $(1);
  $(a, `a`);
  const b = `` + a;
  $(b, `b`);
};
f();
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $(1);
  const a = tmpBinBothLhs + tmpBinBothRhs;
  $(a, `a`);
  const b = `` + a;
  $(b, `b`);
  return undefined;
};
f();
f();
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpBinBothRhs = $(1);
  const a = `` + tmpBinBothRhs;
  $(a, `a`);
  $(a, `b`);
  return undefined;
};
f();
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '1', 'a'
 - 3: '1', 'b'
 - 4: 1
 - 5: '1', 'a'
 - 6: '1', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

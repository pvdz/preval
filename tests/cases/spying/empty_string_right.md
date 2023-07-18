# Preval test case

# empty_string_right.md

> Spying > Empty string right
>
> When appending an empty string to a value known to be a string, the operation is essentially a noop and can be dropped.

#TODO

## Input

`````js filename=intro
function f() {
  const a = '' + $spy(); // Unknown value but known to be a string
  $(a, 'a');
  const b = a + ''; // Redundant. This is what we want to drop.
  $(b, 'b');
}
f();
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = `` + $spy();
  $(a, `a`);
  const b = a + ``;
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
  const tmpBinBothRhs = $spy();
  const a = tmpBinBothLhs + tmpBinBothRhs;
  $(a, `a`);
  const b = $coerce(a, `plustr`);
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
  const tmpBinBothRhs = $spy();
  const a = $coerce(tmpBinBothRhs, `plustr`);
  $(a, `a`);
  $(a, `b`);
  return undefined;
};
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $spy();
  const c = $coerce( b, "plustr" );
  $( c, "a" );
  $( c, "b" );
  return undefined;
},;
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '12345', 'a'
 - 4: '12345', 'b'
 - 5: 'Creating spy', 2, 0, ['spy', 12345]
 - 6: '$spy[2].valueOf()'
 - 7: '12345', 'a'
 - 8: '12345', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# string_plus_string.md

> Binding > String plus string
>
> Caught this regression in the wild. Due to incorrect order of string concat it would flip ab to ba in this example.
> The rest was mandatory code to open the specific path to repro the bug.

## Input

`````js filename=intro
const arr = [ `A`, `B` ];
const f = function() {
  const a = arr[0];
  const b = arr[1];
  const ab = a + b;
  const c = `C`;
  const abc = ab + c;
  $(a, b, ab, c, abc);
  return abc;
};
$(f);
$(f());
`````

## Pre Normal


`````js filename=intro
const arr = [`A`, `B`];
const f = function () {
  debugger;
  const a = arr[0];
  const b = arr[1];
  const ab = a + b;
  const c = `C`;
  const abc = ab + c;
  $(a, b, ab, c, abc);
  return abc;
};
$(f);
$(f());
`````

## Normalized


`````js filename=intro
const arr = [`A`, `B`];
const f = function () {
  debugger;
  const a = arr[0];
  const b = arr[1];
  const ab = a + b;
  const c = `C`;
  const abc = ab + c;
  $(a, b, ab, c, abc);
  return abc;
};
$(f);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  $(`A`, `B`, `AB`, `C`, `ABC`);
  return `ABC`;
};
$(f);
$(`A`, `B`, `AB`, `C`, `ABC`);
$(`ABC`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "A", "B", "AB", "C", "ABC" );
  return "ABC";
};
$( a );
$( "A", "B", "AB", "C", "ABC" );
$( "ABC" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 'A', 'B', 'AB', 'C', 'ABC'
 - 3: 'ABC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

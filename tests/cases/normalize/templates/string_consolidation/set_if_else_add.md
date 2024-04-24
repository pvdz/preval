# Preval test case

# set_if_else_add.md

> Normalize > Templates > String consolidation > Set if else add
>
> Pattern where the two different strings are concat to an unknown value. Can we merge it with another string that inevitably also gets concat to it?

The question is whether we can move `x + y` up into the `if`.

We would need to know that `y` is only read in the last concat to be able to safely move it upward.

We can try to detect whether the result of `y` is that of a string concat in all cases, and if so, concat the string to which it is appended later.

-->
```
let y = 'abcghi';
if (t) { y = 'abcdef' + t; }
else { }
const z = s + y;
```

or

```
let y = undefined;
if (t) { y = 'abcdef' + t; }
else { y = 'abcghi'; }
const z = s + y;
```


#TODO

## Input

`````js filename=intro
const s = $('s');
const t = $('t');

const x = s + 'abc'; 
let y = undefined; 
if (t) { y = 'def' + t; }
else { y = 'ghi'; } 
const z = x + y;
$(z);
`````

## Pre Normal

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const x = s + `abc`;
let y = undefined;
if (t) {
  y = `def` + t;
} else {
  y = `ghi`;
}
const z = x + y;
$(z);
`````

## Normalized

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const tmpStringConcatR = $coerce(s, `plustr`);
const x = `${tmpStringConcatR}abc`;
let y = undefined;
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  y = `def${tmpStringConcatL}`;
} else {
  y = `ghi`;
}
const z = x + y;
$(z);
`````

## Output

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const tmpStringConcatR = $coerce(s, `plustr`);
let y = `ghi`;
let z = undefined;
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  y = `def${tmpStringConcatL}`;
  z = `${tmpStringConcatR}abc${y}`;
  $(z);
} else {
  z = `${tmpStringConcatR}abcghi`;
  $(z);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "s" );
const b = $( "t" );
const c = $coerce( a, "plustr" );
let d = "ghi";
let e = undefined;
if (b) {
  const f = $coerce( b, "plustr" );
  d = `def${[object Object]}`;
  e = `${[object Object]}abc`;
  $( e );
}
else {
  e = `${[object Object]}abcghi`;
  $( e );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 's'
 - 2: 't'
 - 3: 'sabcdeft'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

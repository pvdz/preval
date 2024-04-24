# Preval test case

# set_if_else_add_simpler.md

> Normalize > Templates > String consolidation > Set if else add simpler
>
> Pattern where the two different strings are concat to an unknown value. Can we merge it with another string that inevitably also gets concat to it?

At least, I think it's simpler.

-->
```
let y = 'abcghi';
if (t) { y = 'abcdef' + t; }
else { }
const z = s + y;
```

#TODO

## Input

`````js filename=intro
const s = $('s');
const t = $('t');

const x = 'abc'; 
let y = undefined;
if (t) { y = 'def' + t; }
else { y = 'ghi' + s; }
const z = x + y;
$(z);
`````

## Pre Normal

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const x = `abc`;
let y = undefined;
if (t) {
  y = `def` + t;
} else {
  y = `ghi` + s;
}
const z = x + y;
$(z);
`````

## Normalized

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const x = `abc`;
let y = undefined;
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  y = `def${tmpStringConcatL}`;
} else {
  const tmpStringConcatL$1 = $coerce(s, `plustr`);
  y = `ghi${tmpStringConcatL$1}`;
}
const z = x + y;
$(z);
`````

## Output

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
let y = undefined;
let z = undefined;
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  y = `def${tmpStringConcatL}`;
  const tmpStringConcatL$2 = $coerce(y, `plustr`);
  z = `abc${tmpStringConcatL$2}`;
  $(z);
} else {
  const tmpStringConcatL$1 = $coerce(s, `plustr`);
  y = `ghi${tmpStringConcatL$1}`;
  const tmpStringConcatL$4 = $coerce(y, `plustr`);
  z = `abc${tmpStringConcatL$4}`;
  $(z);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "s" );
const b = $( "t" );
let c = undefined;
let d = undefined;
if (b) {
  const e = $coerce( b, "plustr" );
  c = `def${[object Object]}`;
  const f = $coerce( c, "plustr" );
  d = `abc${[object Object]}`;
  $( d );
}
else {
  const g = $coerce( a, "plustr" );
  c = `ghi${[object Object]}`;
  const h = $coerce( c, "plustr" );
  d = `abc${[object Object]}`;
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 's'
 - 2: 't'
 - 3: 'abcdeft'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

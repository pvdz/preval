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
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  const tmpClusterSSA_z = `abcdef${tmpStringConcatL}`;
  $(tmpClusterSSA_z);
} else {
  const tmpStringConcatL$1 = $coerce(s, `plustr`);
  const tmpClusterSSA_z$1 = `abcghi${tmpStringConcatL$1}`;
  $(tmpClusterSSA_z$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "s" );
const b = $( "t" );
if (b) {
  const c = $coerce( b, "plustr" );
  const d = `abcdef${tmpStringConcatL}`;
  $( d );
}
else {
  const e = $coerce( a, "plustr" );
  const f = `abcghi${tmpStringConcatL$1}`;
  $( f );
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

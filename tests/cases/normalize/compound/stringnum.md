# Preval test case

# stringnum.md

> Normalize > Compound > Stringnum
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

#TODO

## Input

`````js filename=intro
let s = '';
let a = 0;
const obj = {
  get x() { 
    s += 'read;';
    return a;
  },
  set x(v) {
    s += 'write[' + v + '];';
    a += v;
    return a;
  }
};

obj.x = $spy(); // This line should become `obj.x = obj.x + 5`
$(a, s); // 5, 'read;write[5]'
`````

## Pre Normal

`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    s += `read;`;
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    s += `write[` + v + `];`;
    a += v;
    return a;
  },
};
obj.x = $spy();
$(a, s);
`````

## Normalized

`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    const tmpStringConcatR = $coerce(s, `plustr`);
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    const tmpBinLhs = `write[${tmpStringConcatL}`;
    const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
    const tmpBinBothRhs = `${tmpStringConcatR$1}];`;
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = $spy();
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````

## Output

`````js filename=intro
let s = ``;
let a = 0;
const tmpAssignMemRhs = $spy();
const obj = {
  get x() {
    debugger;
    s = `${s}read;`;
    return a;
  },
  set x($$0) {
    const v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    const tmpBinBothRhs = `write[${tmpStringConcatL}];`;
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
obj.x = tmpAssignMemRhs;
$(a, s);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '$spy[1].valueOf()'
 - 4: 12345, 'write[12345];'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

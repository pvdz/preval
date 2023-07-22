# Preval test case

# meh2.md

> If dual assign > And > Meh2
>
> imafool

#TODO

## Input

`````js filename=intro
const f = function (){
  const x = $spy()
  const t = x & 8192;
  if (t) {
    return 128;
  } else {
    const r = x & 128;
    return r;
  }
};
$(f());
$(f());
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const x = $spy();
  const t = x & 8192;
  if (t) {
    return 128;
  } else {
    const r = x & 128;
    return r;
  }
};
$(f());
$(f());
$(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const x = $spy();
  const t = x & 8192;
  if (t) {
    return 128;
  } else {
    const r = x & 128;
    return r;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const x = $spy();
  const t = x & 8192;
  if (t) {
    return 128;
  } else {
    const r = x & 128;
    return r;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $spy();
  const c = b & 8192;
  if (c) {
    return 128;
  }
  else {
    const d = b & 128;
    return d;
  }
};
const e = a();
$( e );
const f = a();
$( f );
const g = a();
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 128
 - 4: 'Creating spy', 2, 0, ['spy', 12345]
 - 5: '$spy[2].valueOf()'
 - 6: 128
 - 7: 'Creating spy', 3, 0, ['spy', 12345]
 - 8: '$spy[3].valueOf()'
 - 9: 128
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

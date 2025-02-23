# Preval test case

# this_method_escaping_bad.md

> Object literal > Inlining > This method escaping bad
>
>

## Input

`````js filename=intro
function evil(func) {
  $('once');
  func.call({f: 1, x: 'burn'});
}
const obj = {
  x: 'pass', f: function(){
    if (this.x === 'burn') return $('burned');
    evil(this.f);                                     // func escapes here
    $(this.x); 
    return 'win';
  }
};
$(obj.f());
`````

## Pre Normal


`````js filename=intro
let evil = function ($$0) {
  let func = $$0;
  debugger;
  $(`once`);
  func.call({ f: 1, x: `burn` });
};
const obj = {
  x: `pass`,
  f: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    if (tmpPrevalAliasThis.x === `burn`) return $(`burned`);
    evil(tmpPrevalAliasThis.f);
    $(tmpPrevalAliasThis.x);
    return `win`;
  },
};
$(obj.f());
`````

## Normalized


`````js filename=intro
let evil = function ($$0) {
  let func = $$0;
  debugger;
  $(`once`);
  const tmpCallObj = func;
  const tmpCallVal = tmpCallObj.call;
  const tmpCalleeParam = { f: 1, x: `burn` };
  $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
  return undefined;
};
const tmpObjLitVal = `pass`;
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpBinLhs = tmpPrevalAliasThis.x;
  const tmpIfTest = tmpBinLhs === `burn`;
  if (tmpIfTest) {
    const tmpReturnArg = $(`burned`);
    return tmpReturnArg;
  } else {
    const tmpCallCallee = evil;
    const tmpCalleeParam$1 = tmpPrevalAliasThis.f;
    tmpCallCallee(tmpCalleeParam$1);
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = tmpPrevalAliasThis.x;
    tmpCallCallee$1(tmpCalleeParam$3);
    return `win`;
  }
};
const obj = { x: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$5 = obj.f();
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 /*:()=>?,string*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpBinLhs /*:unknown*/ = tmpPrevalAliasThis.x;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === `burn`;
  if (tmpIfTest) {
    const tmpReturnArg /*:unknown*/ = $(`burned`);
    return tmpReturnArg;
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasThis.f;
    $(`once`);
    const tmpCalleeParam /*:object*/ = { f: 1, x: `burn` };
    tmpCalleeParam$1.call(tmpCalleeParam);
    const tmpCalleeParam$3 /*:unknown*/ = tmpPrevalAliasThis.x;
    $(tmpCalleeParam$3);
    return `win`;
  }
};
const obj /*:object*/ = { x: `pass`, f: tmpObjLitVal$1 };
const tmpCalleeParam$5 /*:unknown*/ = obj.f();
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b.x;
  const d = c === "burn";
  if (d) {
    const e = $( "burned" );
    return e;
  }
  else {
    const f = b.f;
    $( "once" );
    const g = {
      f: 1,
      x: "burn",
    };
    f.call( g );
    const h = b.x;
    $( h );
    return "win";
  }
};
const i = {
  x: "pass",
  f: a,
};
const j = i.f();
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'once'
 - 2: 'burned'
 - 3: 'pass'
 - 4: 'win'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# always_throws.md

> Common return > Always throws
>
> When a function throws the return value should still be assumed to be whatever is actually returned.

In this case the function should propagate the fact that it always results in a throw.

Call sites could, for example, be transformed into throws themselves. Or throw `undefined` or something obvious, like `throw "Preval: the previous call must throw"` or w/e.

#TODO

## Input

`````js filename=intro
function f() {
  throw 'Some error';
}
try { f(); } catch {}
try { f(); } catch {}
try { f(); } catch {}
try { f(); } catch {}
try { $(f()); } catch {}
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  throw 'Some error';
};
try {
  f();
} catch {}
try {
  f();
} catch {}
try {
  f();
} catch {}
try {
  f();
} catch {}
try {
  $(f());
} catch {}
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  throw 'Some error';
};
try {
  f();
} catch {}
try {
  f();
} catch {}
try {
  f();
} catch {}
try {
  f();
} catch {}
try {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} catch {}
`````

## Output

`````js filename=intro
try {
  throw 'Some error';
} catch {}
try {
  throw 'Some error';
} catch {}
try {
  throw 'Some error';
} catch {}
try {
  throw 'Some error';
} catch {}
try {
  throw 'Some error';
} catch {}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

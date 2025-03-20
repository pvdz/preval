# Preval test case

# always_throws.md

> Common return > Always throws
>
> When a function throws the return value should still be assumed to be whatever is actually returned.

In this case the function should propagate the fact that it always results in a throw.

Call sites could, for example, be transformed into throws themselves. Or throw `undefined` or something obvious, like `throw "Preval: the previous call must throw"` or w/e.

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


## Settled


`````js filename=intro
try {
  throw `Some error`;
} catch (e) {}
try {
  throw `Some error`;
} catch (e$1) {}
try {
  throw `Some error`;
} catch (e$3) {}
try {
  throw `Some error`;
} catch (e$5) {}
try {
  throw `Some error`;
} catch (e$7) {}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `Some error`;
} catch (e) {}
try {
  throw `Some error`;
} catch (e$1) {}
try {
  throw `Some error`;
} catch (e$3) {}
try {
  throw `Some error`;
} catch (e$5) {}
try {
  throw `Some error`;
} catch (e$7) {}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "Some error";
}
catch (a) {

}
try {
  throw "Some error";
}
catch (b) {

}
try {
  throw "Some error";
}
catch (c) {

}
try {
  throw "Some error";
}
catch (d) {

}
try {
  throw "Some error";
}
catch (e) {

}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

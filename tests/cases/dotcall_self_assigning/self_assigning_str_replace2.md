# Preval test case

# self_assigning_str_replace2.md

> Dotcall self assigning > Self assigning str replace2
>
> The var in the loop is doing `str = str.replace()`. But since it's inside a loop, we currently can't predict the result of `str.rplace` due to the chicken-egg problem.

Preval could find this sort of case when there is a decl and assign. If the decl is a primitive and the assign is a dotcall (or other call)
then it could see if it can resolve that function. if the function is depending on the type of the decl itself then start by resolving that
and see if the resulting function returns the same primitive. if so, we would have proven that the variable is always that type, no?

## Input

`````js filename=intro
let count /*:number*/ = 77;
let str = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;
const arr /*:array*/ = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$1 = count;
  count = count - 1;
  if (tmpPostUpdArgIdent$1) {
    const chr = arr[count];
    if (chr) {
      const chr2 = arr[count];
      const regex /*:regex*/ = /xyz/g;
      str = str.replace(regex, chr2);
    } else {
    }
  } else {
    break;
  }
}
$(str);
`````


## Settled


`````js filename=intro
let count /*:number*/ = 77;
let str /*:string*/ = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;
const arr /*:array*/ = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$1 /*:unknown*/ = count;
  count = count - 1;
  if (tmpPostUpdArgIdent$1) {
    const chr /*:primitive*/ = arr[count];
    if (chr) {
      const chr2 /*:primitive*/ = arr[count];
      const regex /*:regex*/ = /xyz/g;
      str = str.replace(regex, chr2);
    } else {
    }
  } else {
    break;
  }
}
$(str);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let count = 77;
let str = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;
const arr = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];
while (true) {
  const tmpPostUpdArgIdent$1 = count;
  count = count - 1;
  if (tmpPostUpdArgIdent$1) {
    if (arr[count]) {
      str = str.replace(/xyz/g, arr[count]);
    }
  } else {
    break;
  }
}
$(str);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 77;
let b = "var 44=[\"\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9";
const c = [ "", "", "", "", "", "", "", "x5C", "x35", "x36", "", "x31" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = a;
  a = a - 1;
  if (d) {
    const e = c[ a ];
    if (e) {
      const f = c[ a ];
      const g = /xyz/g;
      b = b.replace( g, f );
    }
  }
  else {
    break;
  }
}
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

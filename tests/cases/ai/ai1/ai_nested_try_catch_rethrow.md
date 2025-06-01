# Preval test case

# ai_nested_try_catch_rethrow.md

> Ai > Ai1 > Ai nested try catch rethrow
>
> Test: Nested try-catch, inner re-throws, outer catches.

## Input

`````js filename=intro
// Expected: (Path ABC E, correct error values logged, D_unreachable removed)
let path = '';
try {
  path += $('A');
  try {
    path += $('B');
    throw $('err_inner');
  } catch (e_inner) {
    path += $('C');
    $('log_e_inner', e_inner);
    throw e_inner;
  }
  path += $('D_unreachable');
} catch (e_outer) {
  path += $('E');
  $('log_e_outer', e_outer);
}
$('final_path', path);
`````


## Settled


`````js filename=intro
let path /*:string*/ = ``;
try {
  const tmpBinBothRhs /*:unknown*/ = $(`A`);
  path = $coerce(tmpBinBothRhs, `plustr`);
  try {
    const tmpBinBothRhs$1 /*:unknown*/ = $(`B`);
    path = path + tmpBinBothRhs$1;
    const tmpThrowArg /*:unknown*/ = $(`err_inner`);
    throw tmpThrowArg;
  } catch (e_inner) {
    const tmpBinBothRhs$3 /*:unknown*/ = $(`C`);
    path = path + tmpBinBothRhs$3;
    $(`log_e_inner`, e_inner);
    throw e_inner;
  }
  throw `Preval: This statement contained a read that reached no writes: path;`;
} catch (e_outer) {
  const tmpBinBothRhs$7 /*:unknown*/ = $(`E`);
  path = path + tmpBinBothRhs$7;
  $(`log_e_outer`, e_outer);
}
$(`final_path`, path);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let path = ``;
try {
  path = $coerce($(`A`), `plustr`);
  try {
    path = path + $(`B`);
    const tmpThrowArg = $(`err_inner`);
    throw tmpThrowArg;
  } catch (e_inner) {
    path = path + $(`C`);
    $(`log_e_inner`, e_inner);
    throw e_inner;
  }
  throw `Preval: This statement contained a read that reached no writes: path;`;
} catch (e_outer) {
  path = path + $(`E`);
  $(`log_e_outer`, e_outer);
}
$(`final_path`, path);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "";
try {
  const b = $( "A" );
  a = $coerce( b, "plustr" );
  try {
    const c = $( "B" );
    a = a + c;
    const d = $( "err_inner" );
    throw d;
  }
  catch (e) {
    const f = $( "C" );
    a = a + f;
    $( "log_e_inner", e );
    throw e;
  }
  throw "Preval: This statement contained a read that reached no writes: path;";
}
catch (g) {
  const h = $( "E" );
  a = a + h;
  $( "log_e_outer", g );
}
$( "final_path", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let path = ``;
try {
  const tmpBinBothLhs = path;
  const tmpBinBothRhs = $(`A`);
  path = tmpBinBothLhs + tmpBinBothRhs;
  try {
    const tmpBinBothLhs$1 = path;
    const tmpBinBothRhs$1 = $(`B`);
    path = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    const tmpThrowArg = $(`err_inner`);
    throw tmpThrowArg;
  } catch (e_inner) {
    const tmpBinBothLhs$3 = path;
    const tmpBinBothRhs$3 = $(`C`);
    path = tmpBinBothLhs$3 + tmpBinBothRhs$3;
    $(`log_e_inner`, e_inner);
    throw e_inner;
  }
  const tmpBinBothLhs$5 = path;
  const tmpBinBothRhs$5 = $(`D_unreachable`);
  path = tmpBinBothLhs$5 + tmpBinBothRhs$5;
} catch (e_outer) {
  const tmpBinBothLhs$7 = path;
  const tmpBinBothRhs$7 = $(`E`);
  path = tmpBinBothLhs$7 + tmpBinBothRhs$7;
  $(`log_e_outer`, e_outer);
}
$(`final_path`, path);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'B'
 - 3: 'err_inner'
 - 4: 'C'
 - 5: 'log_e_inner', 'err_inner'
 - 6: 'E'
 - 7: 'log_e_outer', 'err_inner'
 - 8: 'final_path', 'ABCE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

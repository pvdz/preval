# Preval test case

# case_loop1.md

> If test lazy init > Case loop1
>
> regression

Same as the case case but without the cache layer logic and only the first loop

## Input

`````js filename=intro
const tmpFree /*:(number, unknown)=>string*/ = function $free(x, y) {
  const tmpBinLhs$5 /*:number*/ = -2 * x;
  const tmpBinBothRhs$3 /*:number*/ /*&6*/ = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1 /*:number*/ = y >> tmpBinBothRhs$3;
  const tmpMCP$1 /*:number*/ /*&255*/ = 255 & tmpBinBothRhs$1;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const main_func /*:(string)=>string*/ = function (str) {
  let output /*:string*/ = ``;
  let pointer_index /*:number*/ = 0;
  let shifted /*:primitive*/ = undefined;
  let counter /*:number*/ = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const current_index /*:number*/ = counter;
    counter = counter + 1;
    const next_char /*:string*/ = $dotCall($string_charAt, str, `charAt`, current_index);
    if (next_char) {
      const char_index /*:number*/ = $dotCall(
        $string_indexOf,
        `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`,
        `indexOf`,
        next_char,
      );
      const was_found /*:number*/ = ~char_index;
      if (was_found) {
        const not_sure_why_4 /*:number*/ = pointer_index % 4;
        if (not_sure_why_4) {
          const times__64 /*:number*/ = shifted * 64;
          shifted = times__64 + char_index;
        } else {
          shifted = char_index;
        }
        const pre_pointer_index /*:number*/ = pointer_index;
        pointer_index = pointer_index + 1;
        const another_4 /*:number*/ = pre_pointer_index % 4;
        if (another_4) {
          const str_part /*:string*/ = $frfr(tmpFree, pointer_index, shifted);
          output = `${output}${str_part}`;
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  return output;
};
const a /*:string*/ = main_func(`vuDiweG`);
const b /*:string*/ = main_func(`zxHJzxb0Aw9U`);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number, unknown)=>string*/ = function $free($$0, $$1) {
  const x /*:number*/ = $$0;
  const y /*:unknown*/ = $$1;
  debugger;
  const tmpBinLhs$5 /*:number*/ = -2 * x;
  const tmpBinBothRhs$3 /*:number*/ /*&6*/ = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1 /*:number*/ = y >> tmpBinBothRhs$3;
  const tmpMCP$1 /*:number*/ /*&255*/ = 255 & tmpBinBothRhs$1;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const main_func /*:(string)=>string*/ = function ($$0) {
  const str /*:string*/ = $$0;
  debugger;
  let output$1 /*:string*/ = ``;
  let pointer_index /*:number*/ = 0;
  let shifted /*:primitive*/ = undefined;
  let counter /*:number*/ = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const current_index /*:number*/ = counter;
    counter = counter + 1;
    const next_char /*:string*/ = $dotCall($string_charAt, str, `charAt`, current_index);
    if (next_char) {
      const char_index /*:number*/ = $dotCall(
        $string_indexOf,
        `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`,
        `indexOf`,
        next_char,
      );
      const was_found /*:number*/ = ~char_index;
      if (was_found) {
        const not_sure_why_4 /*:number*/ = pointer_index % 4;
        if (not_sure_why_4) {
          const times__64 /*:number*/ = shifted * 64;
          shifted = times__64 + char_index;
        } else {
          shifted = char_index;
        }
        const pre_pointer_index /*:number*/ = pointer_index;
        pointer_index = pointer_index + 1;
        const another_4 /*:number*/ = pre_pointer_index % 4;
        if (another_4) {
          const str_part /*:string*/ = $frfr(tmpFree, pointer_index, shifted);
          output$1 = `${output$1}${str_part}`;
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  return output$1;
};
const a /*:string*/ = main_func(`vuDiweG`);
const b /*:string*/ = main_func(`zxHJzxb0Aw9U`);
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(x, y) {
  const tmpBinBothRhs$1 = y >> ((-2 * x) & 6);
  const tmpRet$1 = $String_fromCharCode(255 & tmpBinBothRhs$1);
  return tmpRet$1;
};
const main_func = function (str) {
  let output$1 = ``;
  let pointer_index = 0;
  let shifted = undefined;
  let counter = 0;
  while (true) {
    const current_index = counter;
    counter = counter + 1;
    const next_char = $dotCall($string_charAt, str, `charAt`, current_index);
    if (next_char) {
      const char_index = $dotCall(
        $string_indexOf,
        `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`,
        `indexOf`,
        next_char,
      );
      if (~char_index) {
        if (pointer_index % 4) {
          shifted = shifted * 64 + char_index;
        } else {
          shifted = char_index;
        }
        const pre_pointer_index = pointer_index;
        pointer_index = pointer_index + 1;
        if (pre_pointer_index % 4) {
          const str_part = tmpFree(pointer_index, shifted);
          output$1 = `${output$1}${str_part}`;
        }
      }
    } else {
      break;
    }
  }
  return output$1;
};
$(main_func(`vuDiweG`), main_func(`zxHJzxb0Aw9U`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = -2 * b;
  const e = d & 6;
  const f = c >> e;
  const g = 255 & f;
  const h = $String_fromCharCode( g );
  return h;
};
const i = function($$0 ) {
  const j = $$0;
  debugger;
  let k = "";
  let l = 0;
  let m = undefined;
  let n = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const o = n;
    n = n + 1;
    const p = $dotCall( $string_charAt, j, "charAt", o );
    if (p) {
      const q = $dotCall( $string_indexOf, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=", "indexOf", p );
      const r = ~q;
      if (r) {
        const s = l % 4;
        if (s) {
          const t = m * 64;
          m = t + q;
        }
        else {
          m = q;
        }
        const u = l;
        l = l + 1;
        const v = u % 4;
        if (v) {
          const w = x( a, l, m );
          k = `${k}${w}`;
        }
      }
    }
    else {
      break;
    }
  }
  return k;
};
const y = i( "vuDiweG" );
const z = i( "zxHJzxb0Aw9U" );
$( y, z );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  const tmpBinLhs$5 = -2 * x;
  const tmpBinBothRhs$3 = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1 = y >> tmpBinBothRhs$3;
  const tmpMCP$1 = 255 & tmpBinBothRhs$1;
  const tmpRet$1 = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const main_func = function ($$0) {
  let str = $$0;
  debugger;
  let output = ``;
  let pointer_index = 0;
  let shifted = undefined;
  let counter = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const current_index = counter;
    counter = counter + 1;
    const next_char = $dotCall($string_charAt, str, `charAt`, current_index);
    if (next_char) {
      const char_index = $dotCall(
        $string_indexOf,
        `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`,
        `indexOf`,
        next_char,
      );
      const was_found = ~char_index;
      if (was_found) {
        const not_sure_why_4 = pointer_index % 4;
        if (not_sure_why_4) {
          const times__64 = shifted * 64;
          shifted = times__64 + char_index;
        } else {
          shifted = char_index;
        }
        const pre_pointer_index = pointer_index;
        pointer_index = pointer_index + 1;
        const another_4 = pre_pointer_index % 4;
        if (another_4) {
          const str_part = $frfr(tmpFree, pointer_index, shifted);
          const tmpBinBothLhs$1 = ``;
          const tmpBinBothRhs$2 = $coerce(output, `string`);
          const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$2;
          const tmpBinBothLhs = $coerce(tmpBinLhs$1, `plustr`);
          const tmpBinBothRhs = $coerce(str_part, `string`);
          const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
          output = $coerce(tmpBinLhs, `plustr`);
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  return output;
};
const a = main_func(`vuDiweG`);
const b = main_func(`zxHJzxb0Aw9U`);
$(a, b);
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'UGHXH', 'exception'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

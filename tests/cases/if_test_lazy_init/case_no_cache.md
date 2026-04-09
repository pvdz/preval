# Preval test case

# case_no_cache.md

> If test lazy init > Case no cache
>
> regression

Same as the case case but without the cache layer logic

## Input

`````js filename=intro
const tmpFree$1 /*:(string, number)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$11 /*:string*/ = $$0;
  const $dlr_$$13 /*:number*/ = $$1;
  debugger;
  const tmpMCOO$2 /*:number*/ = $dotCall($string_charCodeAt, $dlr_$$11, `charCodeAt`, $dlr_$$13);
  const tmpStringConcatL$1 /*:string*/ = $dotCall($number_toString, tmpMCOO$2, `toString`, 16);
  const tmpMCOO /*:string*/ /*truthy*/ = `00${tmpStringConcatL$1}`;
  const tmpRet /*:string*/ = $dotCall($string_slice, tmpMCOO, `slice`, -2);
  return tmpRet;
};
const tmpFree /*:(number, unknown)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$15 /*:number*/ = $$0;
  const $dlr_$$17 /*:unknown*/ = $$1;
  debugger;
  const tmpBinLhs$5 /*:number*/ = -2 * $dlr_$$15;
  const tmpBinBothRhs$3 /*:number*/ /*&6*/ = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1 /*:number*/ = $dlr_$$17 >> tmpBinBothRhs$3;
  const tmpMCP$1 /*:number*/ /*&255*/ = 255 & tmpBinBothRhs$1;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const main_func /*:(string)=>string*/ = function ($$0) {
  const $dlr_$$3 /*:string*/ = $$0;
  debugger;
  let some_str$1 /*:string*/ = ``;
  let uri_encoded_payload$1 /*:string*/ = ``;
  let pointer_index /*:number*/ = 0;
  let shifted /*:primitive*/ = undefined;
  let counter /*:number*/ = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const current_index /*:number*/ = counter;
    counter = counter + 1;
    const next_char /*:string*/ = $dotCall($string_charAt, $dlr_$$3, `charAt`, current_index);
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
          some_str$1 = `${some_str$1}${str_part}`;
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  let i /*:number*/ = 0;
  const len /*:number*/ = some_str$1.length;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const maxed /*:boolean*/ = i < len;
    if (maxed) {
      const payload_part /*:string*/ = $frfr(tmpFree$1, some_str$1, i);
      uri_encoded_payload$1 = `${uri_encoded_payload$1}%${payload_part}`;
      i = i + 1;
    } else {
      break;
    }
  }
  const tmpClusterSSA__0x3899bf$2 /*:string*/ = $Global_decodeURIComponent(uri_encoded_payload$1);
  return tmpClusterSSA__0x3899bf$2;
};
const a /*:string*/ = main_func(`vuDiweG`);
const b /*:string*/ = main_func(`zxHJzxb0Aw9U`);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpFree$1 /*:(string, number)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$0 /*:string*/ = $$0;
  const $dlr_$$1 /*:number*/ = $$1;
  debugger;
  const tmpMCOO$2 /*:number*/ = $dotCall($string_charCodeAt, $dlr_$$0, `charCodeAt`, $dlr_$$1);
  const tmpStringConcatL$1 /*:string*/ = $dotCall($number_toString, tmpMCOO$2, `toString`, 16);
  const tmpMCOO /*:string*/ /*truthy*/ = `00${tmpStringConcatL$1}`;
  const tmpRet /*:string*/ = $dotCall($string_slice, tmpMCOO, `slice`, -2);
  return tmpRet;
};
const tmpFree /*:(number, unknown)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$2 /*:number*/ = $$0;
  const $dlr_$$4 /*:unknown*/ = $$1;
  debugger;
  const tmpBinLhs$5 /*:number*/ = -2 * $dlr_$$2;
  const tmpBinBothRhs$3 /*:number*/ /*&6*/ = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1 /*:number*/ = $dlr_$$4 >> tmpBinBothRhs$3;
  const tmpMCP$1 /*:number*/ /*&255*/ = 255 & tmpBinBothRhs$1;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const main_func /*:(string)=>string*/ = function ($$0) {
  const $dlr_$$5 /*:string*/ = $$0;
  debugger;
  let some_str$2 /*:string*/ = ``;
  let uri_encoded_payload$2 /*:string*/ = ``;
  let pointer_index /*:number*/ = 0;
  let shifted /*:primitive*/ = undefined;
  let counter /*:number*/ = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const current_index /*:number*/ = counter;
    counter = counter + 1;
    const next_char /*:string*/ = $dotCall($string_charAt, $dlr_$$5, `charAt`, current_index);
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
          some_str$2 = `${some_str$2}${str_part}`;
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  let i /*:number*/ = 0;
  const len /*:number*/ = some_str$2.length;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const maxed /*:boolean*/ = i < len;
    if (maxed) {
      const payload_part /*:string*/ = $frfr(tmpFree$1, some_str$2, i);
      uri_encoded_payload$2 = `${uri_encoded_payload$2}%${payload_part}`;
      i = i + 1;
    } else {
      break;
    }
  }
  const tmpClusterSSA__0x3899bf$2 /*:string*/ = $Global_decodeURIComponent(uri_encoded_payload$2);
  return tmpClusterSSA__0x3899bf$2;
};
const a /*:string*/ = main_func(`vuDiweG`);
const b /*:string*/ = main_func(`zxHJzxb0Aw9U`);
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free($dlr_$$0, $dlr_$$1) {
  const tmpStringConcatL$1 = $dotCall($number_toString, $dotCall($string_charCodeAt, $dlr_$$0, `charCodeAt`, $dlr_$$1), `toString`, 16);
  const tmpRet = $dotCall($string_slice, `00${tmpStringConcatL$1}`, `slice`, -2);
  return tmpRet;
};
const tmpFree = function $free($dlr_$$2, $dlr_$$4) {
  const tmpBinBothRhs$1 = $dlr_$$4 >> ((-2 * $dlr_$$2) & 6);
  const tmpRet$1 = $String_fromCharCode(255 & tmpBinBothRhs$1);
  return tmpRet$1;
};
const main_func = function ($dlr_$$5) {
  let some_str$2 = ``;
  let uri_encoded_payload$2 = ``;
  let pointer_index = 0;
  let shifted = undefined;
  let counter = 0;
  while (true) {
    const current_index = counter;
    counter = counter + 1;
    const next_char = $dotCall($string_charAt, $dlr_$$5, `charAt`, current_index);
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
          some_str$2 = `${some_str$2}${str_part}`;
        }
      }
    } else {
      break;
    }
  }
  let i = 0;
  const len = some_str$2.length;
  while (true) {
    if (i < len) {
      const payload_part = tmpFree$1(some_str$2, i);
      uri_encoded_payload$2 = `${uri_encoded_payload$2}%${payload_part}`;
      i = i + 1;
    } else {
      break;
    }
  }
  const tmpClusterSSA__0x3899bf$2 = $Global_decodeURIComponent(uri_encoded_payload$2);
  return tmpClusterSSA__0x3899bf$2;
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
  const d = $dotCall( $string_charCodeAt, b, "charCodeAt", c );
  const e = $dotCall( $number_toString, d, "toString", 16 );
  const f = `00${e}`;
  const g = $dotCall( $string_slice, f, "slice", -2 );
  return g;
};
const h = function $free($$0,$$1 ) {
  const i = $$0;
  const j = $$1;
  debugger;
  const k = -2 * i;
  const l = k & 6;
  const m = j >> l;
  const n = 255 & m;
  const o = $String_fromCharCode( n );
  return o;
};
const p = function($$0 ) {
  const q = $$0;
  debugger;
  let r = "";
  let s = "";
  let t = 0;
  let u = undefined;
  let v = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const w = v;
    v = v + 1;
    const x = $dotCall( $string_charAt, q, "charAt", w );
    if (x) {
      const y = $dotCall( $string_indexOf, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=", "indexOf", x );
      const z = ~y;
      if (z) {
        const ba = t % 4;
        if (ba) {
          const bb = u * 64;
          u = bb + y;
        }
        else {
          u = y;
        }
        const bc = t;
        t = t + 1;
        const bd = bc % 4;
        if (bd) {
          const be = bf( h, t, u );
          r = `${r}${be}`;
        }
      }
    }
    else {
      break;
    }
  }
  let bg = 0;
  const bh = r.length;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const bi = bg < bh;
    if (bi) {
      const bj = bf( a, r, bg );
      s = `${s}%${bj}`;
      bg = bg + 1;
    }
    else {
      break;
    }
  }
  const bk = $Global_decodeURIComponent( s );
  return bk;
};
const bl = p( "vuDiweG" );
const bm = p( "zxHJzxb0Aw9U" );
$( bl, bm );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree$1 = function $free($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const $dlr_$$11 = $dlr_$$0;
  const $dlr_$$13 = $dlr_$$1;
  const tmpMCOO$2 = $dotCall($string_charCodeAt, $dlr_$$11, `charCodeAt`, $dlr_$$1);
  const tmpStringConcatL$1 = $dotCall($number_toString, tmpMCOO$2, `toString`, 16);
  const tmpBinBothLhs = `00`;
  const tmpBinBothRhs = $coerce(tmpStringConcatL$1, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpMCOO = $coerce(tmpBinLhs, `plustr`);
  const tmpRet = $dotCall($string_slice, tmpMCOO, `slice`, -2);
  return tmpRet;
};
const tmpFree = function $free($$0, $$1) {
  let $dlr_$$2 = $$0;
  let $dlr_$$4 = $$1;
  debugger;
  const $dlr_$$15 = $dlr_$$2;
  const $dlr_$$17 = $dlr_$$4;
  const tmpBinLhs$5 = -2 * $dlr_$$15;
  const tmpBinBothRhs$3 = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1 = $dlr_$$17 >> tmpBinBothRhs$3;
  const tmpMCP$1 = 255 & tmpBinBothRhs$1;
  const tmpRet$1 = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const main_func = function ($$0) {
  let $dlr_$$6 = $$0;
  debugger;
  const $dlr_$$3 = $dlr_$$6;
  let some_str$1 = ``;
  let uri_encoded_payload$1 = ``;
  let pointer_index = 0;
  let shifted = undefined;
  let counter = 0;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const current_index = counter;
    counter = counter + 1;
    const next_char = $dotCall($string_charAt, $dlr_$$3, `charAt`, current_index);
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
          const tmpBinBothLhs$3 = ``;
          const tmpBinBothRhs$4 = $coerce(some_str$1, `string`);
          const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$4;
          const tmpBinBothLhs$1 = $coerce(tmpBinLhs$3, `plustr`);
          const tmpBinBothRhs$2 = $coerce(str_part, `string`);
          const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$2;
          some_str$1 = $coerce(tmpBinLhs$1, `plustr`);
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  let i = 0;
  const len = some_str$1.length;
  while ($LOOP_NO_UNROLLS_LEFT) {
    const maxed = i < len;
    if (maxed) {
      const payload_part = $frfr(tmpFree$1, some_str$1, i);
      const tmpBinBothLhs$7 = ``;
      const tmpBinBothRhs$8 = $coerce(uri_encoded_payload$1, `string`);
      const tmpBinLhs$8 = tmpBinBothLhs$7 + tmpBinBothRhs$8;
      const tmpStringConcatR = $coerce(tmpBinLhs$8, `plustr`);
      const tmpBinBothLhs$5 = `${tmpStringConcatR}%`;
      const tmpBinBothRhs$6 = $coerce(payload_part, `string`);
      const tmpBinLhs$6 = tmpBinBothLhs$5 + tmpBinBothRhs$6;
      uri_encoded_payload$1 = $coerce(tmpBinLhs$6, `plustr`);
      i = i + 1;
    } else {
      break;
    }
  }
  const tmpClusterSSA__0x3899bf$2 = $Global_decodeURIComponent(uri_encoded_payload$1);
  return tmpClusterSSA__0x3899bf$2;
};
const a = main_func(`vuDiweG`);
const b = main_func(`zxHJzxb0Aw9U`);
$(a, b);
`````


## Todos triggered


- (todo) Support string.charCodeAt when the arg is not a string literal
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) regular property access of an ident feels tricky;
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


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

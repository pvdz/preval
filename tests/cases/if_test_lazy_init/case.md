# Preval test case

# case.md

> If test lazy init > Case
>
> regression

## Input

`````js filename=intro
const tmpFree$2 = function $free($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
  const tmpUnaryArg$3/*:number*/ = $$0;
  const tmpUnaryArg$2/*:number*/ = $$1;
  const tmpBinLhs$7/*:number*/ = $$2;
  const tmpBinLhs$10/*:number*/ = $$3;
  const tmpBinLhs$12/*:number*/ = $$4;
  const tmpUnaryArg$7/*:number*/ = $$5;
  const tmpBinLhs$18/*:number*/ = $$6;
  const tmpUnaryArg$11/*:number*/ = $$7;
  const tmpUnaryArg$15/*:number*/ = $$8;
  const tmpBinLhs$21/*:number*/ = $$9;
  const tmpBinLhs$23/*:number*/ = $$10;
  debugger;
  const tmpBinLhs$35/*:number*/ = -tmpUnaryArg$3;
  const tmpBinLhs$36/*:number*/ = -tmpUnaryArg$2;
  const tmpBinBothLhs$3/*:number*/ = tmpBinLhs$35 / 2;
  const tmpBinBothRhs$6/*:number*/ = tmpBinLhs$36 / 3;
  const tmpBinBothLhs$9/*:number*/ = tmpBinLhs$7 / 1;
  const tmpBinBothRhs$7/*:number*/ = tmpBinBothLhs$3 * tmpBinBothRhs$6;
  const tmpBinBothLhs$13/*:number*/ = tmpBinLhs$10 / 4;
  const tmpBinBothRhs$13/*:number*/ = tmpBinLhs$12 / 5;
  const tmpBinLhs$26/*:number*/ = -tmpUnaryArg$7;
  const tmpBinBothLhs$10/*:number*/ = tmpBinBothLhs$9 + tmpBinBothRhs$7;
  const tmpBinBothRhs$9/*:number*/ = tmpBinBothLhs$13 * tmpBinBothRhs$13;
  const tmpBinBothLhs$8/*:number*/ = tmpBinLhs$18 / 6;
  const tmpBinBothRhs$10/*:number*/ = tmpBinLhs$26 / 7;
  const tmpBinBothLhs$6/*:number*/ = tmpBinBothLhs$10 + tmpBinBothRhs$9;
  const tmpBinBothRhs$4/*:number*/ = tmpBinBothLhs$8 * tmpBinBothRhs$10;
  const tmpBinLhs$8/*:number*/ = -tmpUnaryArg$11;
  const tmpBinBothLhs$4/*:number*/ = tmpBinBothLhs$6 + tmpBinBothRhs$4;
  const tmpBinBothRhs$5/*:number*/ = tmpBinLhs$8 / 8;
  const tmpBinLhs$14/*:number*/ = -tmpUnaryArg$15;
  const tmpBinBothLhs$1/*:number*/ = tmpBinBothLhs$4 + tmpBinBothRhs$5;
  const tmpBinBothRhs$2/*:number*/ = tmpBinLhs$14 / 9;
  const tmpBinBothLhs$29/*:number*/ = tmpBinLhs$21 / 10;
  const tmpBinBothRhs$29/*:number*/ = tmpBinLhs$23 / 11;
  const tmpBinBothLhs$11/*:number*/ = tmpBinBothLhs$1 + tmpBinBothRhs$2;
  const tmpBinBothRhs$11/*:number*/ = tmpBinBothLhs$29 * tmpBinBothRhs$29;
  const _0x35a4b5/*:number*/ = tmpBinBothLhs$11 + tmpBinBothRhs$11;
  const tmpRet$7/*:boolean*/ = _0x35a4b5 === 770576;
  return tmpRet$7;
};
const tmpFree$1 = function $free($$0, $$1) {
  const _0x292af7$1/*:string*/ = $$0;
  const _0x1f6ba0$1/*:number*/ = $$1;
  debugger;
  const tmpMCOO$2/*:number*/ = $dotCall($string_charCodeAt, _0x292af7$1, `charCodeAt`, _0x1f6ba0$1);
  const tmpStringConcatL$1/*:string*/ = $dotCall($number_toString, tmpMCOO$2, `toString`, 16);
  const tmpMCOO/*:string*/ /*truthy*/ = `00${tmpStringConcatL$1}`;
  const tmpRet/*:string*/ = $dotCall($string_slice, tmpMCOO, `slice`, -2);
  return tmpRet;
};
const tmpFree = function $free($$0, $$1) {
  const _0x4a0b6b/*:number*/ = $$0;
  const _0x5626aa/*:unknown*/ = $$1;
  debugger;
  const tmpBinLhs$5/*:number*/ = (-2) * _0x4a0b6b;
  const tmpBinBothRhs$3/*:number*/ /*&6*/ = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1/*:number*/ = _0x5626aa >> tmpBinBothRhs$3;
  const tmpMCP$1/*:number*/ /*&255*/ = 255 & tmpBinBothRhs$1;
  const tmpRet$1/*:string*/ = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const DATA_VAULT = [`CMv0DxjUicHMDw5JDgLVBIGPia`, `BgvUz3rO`, `Aw5MBW`, `mJaWntqWDgH4AfLk`, `C3fWCvu`, `mJq1mJuXotburKvQtLG`, `y29UC29Szq`, `Dg9tDhjPBMC`, `mtKYmZK2C1f4C1fw`, `sufjwe4`, `D2LUmZi`, `yMLUza`, `zxHJzxb0Aw9U`, `lIbqBgvHC2uGCNvUig9UigeGv2LUzg93CYbpuY4`, `x19WCM90B19F`, `D2fYBG`, `zxHPDa`, `ChjVDg90ExbL`, `mJaWngjxsvP4uW`, `nZq0nJiYnevWB09osW`, `CgXHDgzVCM0`, `mtfJzgrSyLu`, `vuDiweG`, `DhjHy2u`, `DgfIBgu`, `wuPtBKi`, `vgHPCYbKzxbLBMrLBMn5igLZig5VDcbZDxbWB3j0zwqGB24G`, `zxjYB3i`, `CMv0DxjUihbYB2nLC3mUBwfPBK1VzhvSzs5Yzxf1AxjLkcDJAgLSzf9WCM9JzxnZjYK`, `y29UC3rYDwn0B3i`, `E30Uy29UC3rYDwn0B3iOiNjLDhvYBIb0AgLZiIKOicK`, `yxnSv3a`, `nJe5ntC4vKDKEwnP`, `mZi5CfjKDwHk`, `zMDuBNK`, `zgHZwuK`, `CevfuMC`, `zxHLyW`, `yxbWBhK`, `mJG1rgXuDvbh`, `sLbUt2G`, `mti4mZzMqMTQu3q`, `vLfWtgq`, `CMv0DxjUihbYB2nLC3mUBwfPBK1VzhvSzs5Yzxf1AxjLkcDVCYCP`, `t3rUBM4`, `BxnODgeGAhr0Chm6lY91Axv0AwXZlMnVBq`, `Bg9N`, `mtq1DenvrNnv`];
let cache_obj = {};
const main_func = function($$0, $$1) {
  const cache_key_part = $$0;
  const proxied_param = $$1;
  debugger;
  const first_el = DATA_VAULT[0];
  const cache_key = cache_key_part + first_el;
  const cached_val = cache_obj[cache_key];
  if (cached_val) {
    return cached_val;
  } else {
    let some_str = ``;
    let uri_encoded_payload = ``;
    let pointer_index = 0;
    let shifted = undefined;
    let counter = 0;
    while ($LOOP_NO_UNROLLS_LEFT) {
      const current_index = counter;
      counter = counter + 1;
      const next_char = $dotCall($string_charAt, proxied_param, `charAt`, current_index);
      if (next_char) {
        const char_index = $dotCall($string_indexOf, `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`, `indexOf`, next_char);
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
            some_str = `${some_str}${str_part}`;
          } else {

          }
        } else {

        }
      } else {
        break;
      }
    }
    let i = 0;
    const len = some_str.length;
    while ($LOOP_NO_UNROLLS_LEFT) {
      const maxed = i < len;
      if (maxed) {
        const payload_part = $frfr(tmpFree$1, some_str, i);
        uri_encoded_payload = `${uri_encoded_payload}%${payload_part}`;
        i = i + 1;
      } else {
        break;
      }
    }
    const tmpClusterSSA__0x3899bf$2 = $Global_decodeURIComponent(uri_encoded_payload);
    cache_obj[cache_key] = tmpClusterSSA__0x3899bf$2;
    return tmpClusterSSA__0x3899bf$2;
  }
};
const tmpA = DATA_VAULT[22];
const a = main_func(22, tmpA);
const tmpB = DATA_VAULT[12];
const b = main_func(12, tmpB);

$(a, b);
`````


## Settled


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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free($dlr_$$11, $dlr_$$13) {
  const tmpStringConcatL$1 = $dotCall($number_toString, $dotCall($string_charCodeAt, $dlr_$$11, `charCodeAt`, $dlr_$$13), `toString`, 16);
  const tmpRet = $dotCall($string_slice, `00${tmpStringConcatL$1}`, `slice`, -2);
  return tmpRet;
};
const tmpFree = function $free($dlr_$$15, $dlr_$$17) {
  const tmpBinBothRhs$1 = $dlr_$$17 >> ((-2 * $dlr_$$15) & 6);
  const tmpRet$1 = $String_fromCharCode(255 & tmpBinBothRhs$1);
  return tmpRet$1;
};
const main_func = function ($dlr_$$3) {
  let some_str$1 = ``;
  let uri_encoded_payload$1 = ``;
  let pointer_index = 0;
  let shifted = undefined;
  let counter = 0;
  while (true) {
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
          some_str$1 = `${some_str$1}${str_part}`;
        }
      }
    } else {
      break;
    }
  }
  let i = 0;
  const len = some_str$1.length;
  while (true) {
    if (i < len) {
      const payload_part = tmpFree$1(some_str$1, i);
      uri_encoded_payload$1 = `${uri_encoded_payload$1}%${payload_part}`;
      i = i + 1;
    } else {
      break;
    }
  }
  const tmpClusterSSA__0x3899bf$2 = $Global_decodeURIComponent(uri_encoded_payload$1);
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
const tmpFree$2 = function $free($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9, $$10) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  let $dlr_$$2 = $$2;
  let $dlr_$$3 = $$3;
  let $dlr_$$4 = $$4;
  let $dlr_$$5 = $$5;
  let $dlr_$$6 = $$6;
  let $dlr_$$7 = $$7;
  let $dlr_$$8 = $$8;
  let $dlr_$$9 = $$9;
  let $dlr_$$10 = $$10;
  debugger;
  const tmpUnaryArg$3 = $dlr_$$0;
  const tmpUnaryArg$2 = $dlr_$$1;
  const tmpBinLhs$7 = $dlr_$$2;
  const tmpBinLhs$10 = $dlr_$$3;
  const tmpBinLhs$12 = $dlr_$$4;
  const tmpUnaryArg$7 = $dlr_$$5;
  const tmpBinLhs$18 = $dlr_$$6;
  const tmpUnaryArg$11 = $dlr_$$7;
  const tmpUnaryArg$15 = $dlr_$$8;
  const tmpBinLhs$21 = $dlr_$$9;
  const tmpBinLhs$23 = $dlr_$$10;
  const tmpBinLhs$35 = -tmpUnaryArg$3;
  const tmpBinLhs$36 = -tmpUnaryArg$2;
  const tmpBinBothLhs$3 = tmpBinLhs$35 / 2;
  const tmpBinBothRhs$6 = tmpBinLhs$36 / 3;
  const tmpBinBothLhs$9 = tmpBinLhs$7 / 1;
  const tmpBinBothRhs$7 = tmpBinBothLhs$3 * tmpBinBothRhs$6;
  const tmpBinBothLhs$13 = tmpBinLhs$10 / 4;
  const tmpBinBothRhs$13 = tmpBinLhs$12 / 5;
  const tmpBinLhs$26 = -tmpUnaryArg$7;
  const tmpBinBothLhs$10 = tmpBinBothLhs$9 + tmpBinBothRhs$7;
  const tmpBinBothRhs$9 = tmpBinBothLhs$13 * tmpBinBothRhs$13;
  const tmpBinBothLhs$8 = tmpBinLhs$18 / 6;
  const tmpBinBothRhs$10 = tmpBinLhs$26 / 7;
  const tmpBinBothLhs$6 = tmpBinBothLhs$10 + tmpBinBothRhs$9;
  const tmpBinBothRhs$4 = tmpBinBothLhs$8 * tmpBinBothRhs$10;
  const tmpBinLhs$8 = -tmpUnaryArg$11;
  const tmpBinBothLhs$4 = tmpBinBothLhs$6 + tmpBinBothRhs$4;
  const tmpBinBothRhs$5 = tmpBinLhs$8 / 8;
  const tmpBinLhs$14 = -tmpUnaryArg$15;
  const tmpBinBothLhs$1 = tmpBinBothLhs$4 + tmpBinBothRhs$5;
  const tmpBinBothRhs$2 = tmpBinLhs$14 / 9;
  const tmpBinBothLhs$29 = tmpBinLhs$21 / 10;
  const tmpBinBothRhs$29 = tmpBinLhs$23 / 11;
  const tmpBinBothLhs$11 = tmpBinBothLhs$1 + tmpBinBothRhs$2;
  const tmpBinBothRhs$11 = tmpBinBothLhs$29 * tmpBinBothRhs$29;
  const _0x35a4b5 = tmpBinBothLhs$11 + tmpBinBothRhs$11;
  const tmpRet$7 = _0x35a4b5 === 770576;
  return tmpRet$7;
};
const tmpFree$1 = function $free($$0, $$1) {
  let $dlr_$$11 = $$0;
  let $dlr_$$13 = $$1;
  debugger;
  const _0x292af7$1 = $dlr_$$11;
  const _0x1f6ba0$1 = $dlr_$$13;
  const tmpMCOO$2 = $dotCall($string_charCodeAt, _0x292af7$1, `charCodeAt`, $dlr_$$13);
  const tmpStringConcatL$1 = $dotCall($number_toString, tmpMCOO$2, `toString`, 16);
  const tmpBinBothLhs = `00`;
  const tmpBinBothRhs = $coerce(tmpStringConcatL$1, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpMCOO = $coerce(tmpBinLhs, `plustr`);
  const tmpRet = $dotCall($string_slice, tmpMCOO, `slice`, -2);
  return tmpRet;
};
const tmpFree = function $free($$0, $$1) {
  let $dlr_$$15 = $$0;
  let $dlr_$$17 = $$1;
  debugger;
  const _0x4a0b6b = $dlr_$$15;
  const _0x5626aa = $dlr_$$17;
  const tmpBinLhs$5 = -2 * _0x4a0b6b;
  const tmpBinBothRhs$3 = tmpBinLhs$5 & 6;
  const tmpBinBothRhs$1 = _0x5626aa >> tmpBinBothRhs$3;
  const tmpMCP$1 = 255 & tmpBinBothRhs$1;
  const tmpRet$1 = $String_fromCharCode(tmpMCP$1);
  return tmpRet$1;
};
const DATA_VAULT = [
  `CMv0DxjUicHMDw5JDgLVBIGPia`,
  `BgvUz3rO`,
  `Aw5MBW`,
  `mJaWntqWDgH4AfLk`,
  `C3fWCvu`,
  `mJq1mJuXotburKvQtLG`,
  `y29UC29Szq`,
  `Dg9tDhjPBMC`,
  `mtKYmZK2C1f4C1fw`,
  `sufjwe4`,
  `D2LUmZi`,
  `yMLUza`,
  `zxHJzxb0Aw9U`,
  `lIbqBgvHC2uGCNvUig9UigeGv2LUzg93CYbpuY4`,
  `x19WCM90B19F`,
  `D2fYBG`,
  `zxHPDa`,
  `ChjVDg90ExbL`,
  `mJaWngjxsvP4uW`,
  `nZq0nJiYnevWB09osW`,
  `CgXHDgzVCM0`,
  `mtfJzgrSyLu`,
  `vuDiweG`,
  `DhjHy2u`,
  `DgfIBgu`,
  `wuPtBKi`,
  `vgHPCYbKzxbLBMrLBMn5igLZig5VDcbZDxbWB3j0zwqGB24G`,
  `zxjYB3i`,
  `CMv0DxjUihbYB2nLC3mUBwfPBK1VzhvSzs5Yzxf1AxjLkcDJAgLSzf9WCM9JzxnZjYK`,
  `y29UC3rYDwn0B3i`,
  `E30Uy29UC3rYDwn0B3iOiNjLDhvYBIb0AgLZiIKOicK`,
  `yxnSv3a`,
  `nJe5ntC4vKDKEwnP`,
  `mZi5CfjKDwHk`,
  `zMDuBNK`,
  `zgHZwuK`,
  `CevfuMC`,
  `zxHLyW`,
  `yxbWBhK`,
  `mJG1rgXuDvbh`,
  `sLbUt2G`,
  `mti4mZzMqMTQu3q`,
  `vLfWtgq`,
  `CMv0DxjUihbYB2nLC3mUBwfPBK1VzhvSzs5Yzxf1AxjLkcDVCYCP`,
  `t3rUBM4`,
  `BxnODgeGAhr0Chm6lY91Axv0AwXZlMnVBq`,
  `Bg9N`,
  `mtq1DenvrNnv`,
];
let cache_obj = {};
const main_func = function ($$0, $$1) {
  let $dlr_$$19 = $$0;
  let $dlr_$$21 = $$1;
  debugger;
  const cache_key_part = $dlr_$$19;
  const proxied_param = $dlr_$$21;
  const first_el = DATA_VAULT[0];
  const cache_key = cache_key_part + first_el;
  const cached_val = cache_obj[cache_key];
  if (cached_val) {
    return cached_val;
  } else {
    let some_str = ``;
    let uri_encoded_payload = ``;
    let pointer_index = 0;
    let shifted = undefined;
    let counter = 0;
    while ($LOOP_NO_UNROLLS_LEFT) {
      const current_index = counter;
      counter = counter + 1;
      const next_char = $dotCall($string_charAt, proxied_param, `charAt`, current_index);
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
            const tmpBinBothLhs$5 = ``;
            const tmpBinBothRhs$12 = $coerce(some_str, `string`);
            const tmpBinLhs$3 = tmpBinBothLhs$5 + tmpBinBothRhs$12;
            const tmpBinBothLhs$2 = $coerce(tmpBinLhs$3, `plustr`);
            const tmpBinBothRhs$8 = $coerce(str_part, `string`);
            const tmpBinLhs$1 = tmpBinBothLhs$2 + tmpBinBothRhs$8;
            some_str = $coerce(tmpBinLhs$1, `plustr`);
          } else {
          }
        } else {
        }
      } else {
        break;
      }
    }
    let i = 0;
    const len = some_str.length;
    while ($LOOP_NO_UNROLLS_LEFT) {
      const maxed = i < len;
      if (maxed) {
        const payload_part = $frfr(tmpFree$1, some_str, i);
        const tmpBinBothLhs$12 = ``;
        const tmpBinBothRhs$16 = $coerce(uri_encoded_payload, `string`);
        const tmpBinLhs$9 = tmpBinBothLhs$12 + tmpBinBothRhs$16;
        const tmpStringConcatR = $coerce(tmpBinLhs$9, `plustr`);
        const tmpBinBothLhs$7 = `${tmpStringConcatR}%`;
        const tmpBinBothRhs$14 = $coerce(payload_part, `string`);
        const tmpBinLhs$6 = tmpBinBothLhs$7 + tmpBinBothRhs$14;
        uri_encoded_payload = $coerce(tmpBinLhs$6, `plustr`);
        i = i + 1;
      } else {
        break;
      }
    }
    const tmpClusterSSA__0x3899bf$2 = $Global_decodeURIComponent(uri_encoded_payload);
    cache_obj[cache_key] = tmpClusterSSA__0x3899bf$2;
    return tmpClusterSSA__0x3899bf$2;
  }
};
const tmpA = DATA_VAULT[22];
const a = main_func(22, tmpA);
const tmpB = DATA_VAULT[12];
const b = main_func(12, tmpB);
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

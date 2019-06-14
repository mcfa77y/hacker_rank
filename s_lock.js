function build_count_map(arr) {
  return arr.reduce((acc, value) => {
    if (acc[value] == undefined) {
      acc[value] = 1;
    } else {
      acc[value] += 1;
    }
    return acc;
  }, {});
}

function isValid(s) {
  const a_count_map = build_count_map(s.split(''));
  const freq_count = {};
  Object.keys(a_count_map).forEach((key) => {
    const a_count = a_count_map[key];
    if (freq_count[a_count] == undefined) {
      freq_count[a_count] = 1;
    } else {
      freq_count[a_count] += 1;
    }
  });

  const freq_key_count = Object.keys(freq_count);
  if (freq_key_count == 1) {
    return 'YES';
  } else if (freq_key_count.length > 2) {

    return 'NO';
  } else {
    const first = freq_count[freq_key_count[0]];
    const second = freq_count[freq_key_count[1]];
    if (((freq_key_count[0] == 1 && first - 1 == 0) || (freq_key_count[1] == 1 && second - 1 == 0))) {
      return 'YES';
    }
    else if ((first - 1 == 0 || second - 1 == 0) && (Math.abs(freq_key_count[0] - freq_key_count[1]) == 1)){
      return "YES";
    }
    else{ return 'NO';
    }
  }


}

isValid('ihtuwvgfwvgfelssduismbujdnxjtmjkjdevhwmaiuooiwoiwugqblrbqiwcxbanmdhfivtjqlyxrtumduxreaxswtcmfhjrwemtyjhcywmockxtwikvwboqfphbrtwbunuqwmvtpayuxgvtpjcqsfgssjmtuqfctbjrlkkjpcpeabeoymxpfyugaxidvqmbcgibgsumlrllqsdvbliffdstkreaankrlmsfqfyqxxyekrsakcvrmsyksxnpajqnvotqovepcwpcllyopfdmxxjhcnymgkxqjqyljnbisvopdkttgmwslejhejbgvjwpanvumxkfkvmtlryvucdrisiibsvtioqcohgrivpxhmlgrkxwgkexdwpihhfayjobsnfsxvdhrhanllxirjitvqtwlhvmrewyphdyaylunetcbvklvlxhodnemegqjkoipdtasrgleorikhqhhkvxkinfjylaqqwmbovstlngaaltyasqutawhtnsvqosslwfvfgjxxtolphnkyvgamntawrdlwiuacqirfjliarutjygidpyjcvaifibnprgwjdirngmtjmevqntnkchcgxautanqbfcqjlsajdfbdisqtrbjjvoglvpwftnmcwohedqtvypumihgiiiujwuvuikguxuqmpkohslvorndrkqnojfaghsaydtswkexrjjjrvujrqvrsyvufrhnjsmtxljpdjhrulooydrfdvdaxrrsbmaisxxsnnmincetrmfjphqddeftimsfftmvbijmikqbirenmjlmuywmdsejxijlhbpusemntqykpijaxtoktuajqcpruhmsjqdmqdhqebeyqupinjlhwwfbmxqtqhanrtegmmmjhstxbgwwcdqblskvkinjdijemkuoqwutjfcfbvcrybdtelwdbwuvcemuaffkhmorhpxbclvnfvrpurapyxknkpswkverdccdswyeaqxqrytswsknwuenwdwaoehlltduybndpjmigyukpwv');